const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 获取 Chrome 默认下载文件夹
const downloadPath = path.join(os.homedir(), 'Downloads');
const progressFile = path.join(__dirname, 'download_progress.json');

// 读取下载进度
function loadProgress() {
  try {
    if (fs.existsSync(progressFile)) {
      const data = fs.readFileSync(progressFile, 'utf8');
      const progress = JSON.parse(data);
      console.log('📝 读取进度文件成功，上次处理到第', progress.lastPage, '页');
      // 从下一页开始处理
      progress.lastPage = progress.lastPage + 1;
      return progress;
    }
  } catch (error) {
    console.log('读取进度文件失败:', error.message);
  }
  console.log('⚠️ 未找到进度文件，将从第 1 页开始');
  return { lastPage: 1, downloadedFiles: [] };
}

// 保存下载进度
function saveProgress(progress) {
  try {
    fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
  } catch (error) {
    console.log('保存进度失败:', error.message);
  }
}

// 检查文件是否已下载
function isFileDownloaded(filename, progress) {
  return progress.downloadedFiles.includes(filename);
}

async function waitForPageLoad(page) {
  try {
    // 等待页面加载完成
    await page.waitForFunction(() => {
      return document.readyState === 'complete';
    }, { timeout: 15000 });

    // 等待歌曲列表容器出现
    await page.waitForSelector('.favorite-songs-container', { timeout: 15000 });
    
    // 额外等待确保内容加载
    await delay(2000);
    return true;
  } catch (error) {
    console.log('⚠️ 页面加载超时，可能需要登录或页面不存在');
    return false;
  }
}

async function isDownloading(page) {
  try {
    // 检查是否有 downloading 字样
    const hasDownloadingText = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      return Array.from(elements).some(el => 
        el.textContent && el.textContent.toLowerCase().includes('downloading')
      );
    });

    if (hasDownloadingText) {
      console.log('💭 发现 Downloading 字样，正在下载中...');
      return true;
    }

    // 检查对话框状态
    const hasDialog = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]');
      return dialog && window.getComputedStyle(dialog).display !== 'none';
    });

    if (hasDialog) {
      console.log('💭 下载对话框仍在显示中...');
      return true;
    }

    return false;
  } catch (error) {
    console.log('检查下载状态时出错：', error.message);
    return false;
  }
}

async function waitForDownloadComplete(page) {
  console.log('⏳ 等待下载完成...');
  
  let attempts = 0;
  const maxAttempts = 120; // 最多等待 2 分钟
  
  while (attempts < maxAttempts) {
    const downloading = await isDownloading(page);
    if (!downloading) {
      console.log('✅ 下载似乎已完成');
      // 额外等待一秒确保完全完成
      await new Promise(r => setTimeout(r, 1000));
      return true;
    }
    
    await new Promise(r => setTimeout(r, 1000)); // 每秒检查一次
    attempts++;
    
    if (attempts % 10 === 0) {
      console.log(`⏳ 已等待 ${attempts} 秒...`);
    }
  }
  
  console.log('⚠️ 等待下载超时');
  return false;
}

async function waitForFileDownload() {
  console.log('⏳ 等待文件下载...');
  console.log('📂 监控下载文件夹:', downloadPath);
  
  const beforeFiles = new Set(fs.readdirSync(downloadPath));
  
  return new Promise((resolve) => {
    let timeoutId;
    const watcher = fs.watch(downloadPath, (eventType, filename) => {
      if (eventType === 'rename' && filename) {
        const currentFiles = new Set(fs.readdirSync(downloadPath));
        const newFiles = [...currentFiles].filter(x => !beforeFiles.has(x));
        
        const newAudioFiles = newFiles.filter(file => 
          file.endsWith('.m4a') || file.endsWith('.mp3')
        );
        
        if (newAudioFiles.length > 0) {
          const downloadedFile = newAudioFiles[0];
          console.log('✅ 检测到新下载的音频文件:', downloadedFile);
          clearTimeout(timeoutId);
          watcher.close();
          resolve(downloadedFile);
        }
      }
    });
    
    timeoutId = setTimeout(() => {
      watcher.close();
      console.log('⚠️ 等待下载超时');
      resolve(null);
    }, 120000);
  });
}

async function hasNextPage(page) {
  try {
    const nextButton = await page.$('button.next-button');
    if (!nextButton) return false;

    const isLastPage = await page.evaluate(button => {
      return button.classList.contains('disabled') || 
             button.getAttribute('disabled') !== null;
    }, nextButton);

    return !isLastPage;
  } catch (error) {
    console.log('检查下一页时出错:', error.message);
    return false;
  }
}

async function goToNextPage(page) {
  try {
    console.log('📄 切换到下一页...');
    await page.click('button.next-button');
    await new Promise(r => setTimeout(r, 2000));
    return true;
  } catch (error) {
    console.log('切换页面时出错:', error.message);
    return false;
  }
}

async function getSongTitle(btn) {
  try {
    return await btn.evaluate(element => {
      const card = element.closest('.song-card');
      if (card) {
        const titleElement = card.querySelector('.song-title');
        return titleElement ? titleElement.textContent.trim() : null;
      }
      return null;
    });
  } catch (error) {
    console.log('获取歌曲标题失败:', error.message);
    return null;
  }
}

async function processAllSongs(page) {
  let progress = loadProgress();
  let currentPage = progress.lastPage;
  let hasMore = true;

  // 如果不在正确的页面，先导航到上次的页面
  const currentUrl = await page.url();
  const targetUrl = `https://soundraw.io/favorite?page=${currentPage}`;
  if (currentUrl !== targetUrl) {
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
  }

  while (hasMore) {
    console.log(`\n📑 正在处理第 ${currentPage} 页`);
    
    const downloadBtns = await page.$$('button#gtm-track-download-btn');
    console.log(`找到 ${downloadBtns.length} 个下载按钮`);

    for (let i = 0; i < downloadBtns.length; i++) {
      try {
        const btn = downloadBtns[i];
        const songTitle = await getSongTitle(btn);
        
        if (songTitle && isFileDownloaded(songTitle, progress)) {
          console.log(`⏭️ 跳过已下载的歌曲: ${songTitle}`);
          continue;
        }

        console.log(`\n▶️ 处理第 ${i + 1}/${downloadBtns.length} 首歌${songTitle ? ': ' + songTitle : ''}`);

        await btn.evaluate(b => b.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        await new Promise(r => setTimeout(r, 800));

        await btn.click();
        await new Promise(r => setTimeout(r, 1500));

        const mp3Btn = await page.$('button.primary-btn');

        if (!mp3Btn) {
          console.log('未发现 MP3 按钮，等待当前下载完成...');
          const downloadedFile = await waitForFileDownload();
          if (downloadedFile && songTitle) {
            progress.downloadedFiles.push(songTitle);
            saveProgress(progress);
          }
          continue;
        }

        await mp3Btn.click();
        const downloadedFile = await waitForFileDownload();
        if (downloadedFile && songTitle) {
          progress.downloadedFiles.push(songTitle);
          saveProgress(progress);
        }

      } catch (error) {
        console.log(`❌ 处理第 ${i + 1} 首歌时出错:`, error.message);
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    if (await hasNextPage(page)) {
      console.log('\n✨ 发现下一页，准备切换...');
      const success = await goToNextPage(page);
      if (!success) {
        console.log('❌ 切换到下一页失败，停止处理');
        hasMore = false;
      } else {
        currentPage++;
        progress.lastPage = currentPage;
        saveProgress(progress);
      }
    } else {
      console.log('\n🎉 已经是最后一页了！');
      hasMore = false;
    }
  }
}

(async () => {
  try {
    console.log('🔍 正在连接到 Chrome...');
    const browser = await puppeteer.connect({
      browserURL: 'http://127.0.0.1:9222',
      defaultViewport: null
    });

    console.log('✅ 成功连接到 Chrome');
    const pages = await browser.pages();
    console.log(`发现 ${pages.length} 个标签页`);
    
    const page = pages[0];
    console.log('当前页面 URL:', await page.url());

    await processAllSongs(page);

    await browser.disconnect();
    console.log('👋 已断开与浏览器的连接');

  } catch (error) {
    console.error('❌ 发生错误：', error);
  }
})();
