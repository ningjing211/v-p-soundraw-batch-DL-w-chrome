const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 获取 Chrome 默认下载文件夹
const downloadPath = path.join(os.homedir(), 'Downloads');
const progressFile = path.join(__dirname, 'download_progress.json');
const downloadLogFile = path.join(__dirname, 'download_log.json');

// 读取下载进度
function loadProgress() {
  try {
    // 先嘗試讀取download_log.json
    if (fs.existsSync(downloadLogFile)) {
      const logData = fs.readFileSync(downloadLogFile, 'utf8');
      const log = JSON.parse(logData);
      if (log.sessions && log.sessions.length > 0) {
        // 找到最後一個有下載歌曲的會話
        const lastSessionWithSongs = log.sessions.find(session => session.totalSongs > 0);
        if (lastSessionWithSongs) {
          console.log('📝 讀取下載日誌成功，上次下載到第', lastSessionWithSongs.totalSongs, '首');
          console.log(`ℹ️ 將從第 ${lastSessionWithSongs.lastPage} 頁的第 ${lastSessionWithSongs.nextStartIndex} 首開始下載`);
          return {
            lastPage: lastSessionWithSongs.lastPage || 1,
            downloadedFiles: lastSessionWithSongs.songs.map(song => song.songName),
            nextStartIndex: lastSessionWithSongs.nextStartIndex || 1
          };
        }
      }
    }

    // 如果沒有有效的下載記錄，從頭開始
    console.log('⚠️ 未找到有效的下載記錄，將從第 1 頁開始');
    return { lastPage: 1, downloadedFiles: [], nextStartIndex: 1 };
  } catch (error) {
    console.log('讀取進度文件失敗:', error.message);
    return { lastPage: 1, downloadedFiles: [], nextStartIndex: 1 };
  }
}

// 保存下载进度
function saveProgress(progress) {
  try {
    fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
  } catch (error) {
    console.log('保存进度失败:', error.message);
  }
}

// 读取下载日志
function loadDownloadLog() {
  try {
    if (fs.existsSync(downloadLogFile)) {
      const data = fs.readFileSync(downloadLogFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.log('读取下载日志失败:', error.message);
  }
  return {
    sessions: [],
    currentSession: {
      startTime: new Date().toISOString(),
      songs: [],
      totalSongs: 0
    }
  };
}

// 保存下载日志
function saveDownloadLog(log) {
  try {
    fs.writeFileSync(downloadLogFile, JSON.stringify(log, null, 2));
  } catch (error) {
    console.log('保存下载日志失败:', error.message);
  }
}

// 记录下载的歌曲
function logDownloadedSong(log, songTitle, pageNumber, songIndex) {
  log.currentSession.songs.push({
    title: songTitle,
    page: pageNumber,
    index: songIndex,
    downloadTime: new Date().toISOString()
  });
  log.currentSession.totalSongs++;
  saveDownloadLog(log);
}

// 完成当前会话
function completeSession(log) {
  log.currentSession.endTime = new Date().toISOString();
  log.sessions.push(log.currentSession);
  log.currentSession = {
    startTime: new Date().toISOString(),
    songs: [],
    totalSongs: 0
  };
  saveDownloadLog(log);
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
    // 獲取當前頁碼
    const activePage = await page.evaluate(() => {
      const activeButton = document.querySelector('.paginate-buttons.number-buttons.active-page');
      return activeButton ? parseInt(activeButton.textContent) : 1;
    });

    // 獲取最大頁碼
    const maxPage = await page.evaluate(() => {
      const numberButtons = document.querySelectorAll('.paginate-buttons.number-buttons');
      let max = 1;
      numberButtons.forEach(button => {
        const num = parseInt(button.textContent);
        if (!isNaN(num) && num > max) {
          max = num;
        }
      });
      return max;
    });

    console.log(`當前在第 ${activePage} 頁，最大頁數為 ${maxPage} 頁`);
    
    // 如果當前頁碼小於最大頁碼，表示還有下一頁
    const hasNext = activePage < maxPage;
    
    if (!hasNext) {
      console.log('🎯 已到達最後一頁');
    }
    
    return hasNext;
  } catch (error) {
    console.log('檢查頁碼時出錯:', error.message);
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
  console.log('開始處理歌曲...');
  let downloadLog = loadDownloadLog();
  let progress = loadProgress();
  let currentPage = progress.lastPage;
  let hasMore = true;

  // 計算當前頁面上應該跳過的歌曲數
  let skipCount = progress.nextStartIndex - 1;
  console.log(`ℹ️ 將從第 ${currentPage} 頁的第 ${skipCount + 1} 首歌開始下載`);

  // 如果不在正確的頁面，先導航到上次的頁面
  const currentUrl = await page.url();
  console.log('當前URL:', currentUrl);
  const targetUrl = `https://soundraw.io/favorite?page=${currentPage}`;
  if (!currentUrl.includes(targetUrl)) {
    console.log(`🔄 導航到上次的頁面: ${targetUrl}`);
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    console.log('頁面加載完成');
    await new Promise(r => setTimeout(r, 2000));
  }

  while (hasMore) {
    console.log(`\n📑 正在處理第 ${currentPage} 頁`);
    
    console.log('等待下載按鈕出現...');
    await page.waitForSelector('button#gtm-track-download-btn', { timeout: 10000 }).catch(e => {
      console.log('等待下載按鈕超時:', e.message);
    });
    
    const downloadBtns = await page.$$('button#gtm-track-download-btn');
    console.log(`找到 ${downloadBtns.length} 個下載按鈕`);

    for (let i = 0; i < downloadBtns.length; i++) {
      // 跳過已下載的歌曲
      if (i < skipCount) {
        console.log(`⏭️ 跳過第 ${i + 1} 首歌（已在上次下載）`);
        continue;
      }

      try {
        const btn = downloadBtns[i];
        const songTitle = await getSongTitle(btn);
        
        if (songTitle && isFileDownloaded(songTitle, progress)) {
          console.log(`⏭️ 跳過已下載的歌曲: ${songTitle}`);
          continue;
        }

        console.log(`\n▶️ 處理第 ${i + 1}/${downloadBtns.length} 首歌${songTitle ? ': ' + songTitle : ''}`);

        await btn.evaluate(b => b.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        await new Promise(r => setTimeout(r, 800));

        await btn.click();
        await new Promise(r => setTimeout(r, 1500));

        const mp3Btn = await page.$('button.primary-btn');

        if (!mp3Btn) {
          console.log('未發現 MP3 按鈕，等待當前下載完成...');
          const downloadedFile = await waitForFileDownload();
          if (downloadedFile && songTitle) {
            progress.downloadedFiles.push(songTitle);
            saveProgress(progress);
            logDownloadedSong(downloadLog, songTitle, currentPage, i + 1);
          }
          continue;
        }

        await mp3Btn.click();
        const downloadedFile = await waitForFileDownload();
        if (downloadedFile && songTitle) {
          progress.downloadedFiles.push(songTitle);
          saveProgress(progress);
          logDownloadedSong(downloadLog, songTitle, currentPage, i + 1);
        }

      } catch (error) {
        console.log(`❌ 處理第 ${i + 1} 首歌時出錯:`, error.message);
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    // 重置跳過計數（只在第一頁需要）
    skipCount = 0;

    if (await hasNextPage(page)) {
      console.log('\n✨ 發現下一頁，準備切換...');
      const success = await goToNextPage(page);
      if (!success) {
        console.log('❌ 切換到下一頁失敗，停止處理');
        hasMore = false;
      } else {
        currentPage++;
        progress.lastPage = currentPage;
        saveProgress(progress);
      }
    } else {
      console.log('\n🎉 已經是最後一頁了！');
      hasMore = false;
    }
  }
  
  // 完成當前會話
  completeSession(downloadLog);
  console.log('\n📊 本次下載會話統計：');
  console.log(`總共下載了 ${downloadLog.currentSession.totalSongs} 首歌曲`);
  console.log(`下一頁將從第 ${progress.lastPage} 頁開始`);
}

(async () => {
  try {
    console.log('🔍 正在連接到 Chrome...');
    console.log('正在檢查Chrome調試端口...');
    
    const browser = await puppeteer.connect({
      browserURL: 'http://127.0.0.1:9222',
      defaultViewport: null
    }).catch(error => {
      console.error('連接Chrome失敗:', error.message);
      throw error;
    });

    console.log('✅ 成功連接到 Chrome');
    console.log('正在獲取頁面列表...');
    
    const pages = await browser.pages().catch(error => {
      console.error('獲取頁面列表失敗:', error.message);
      throw error;
    });
    
    console.log(`發現 ${pages.length} 個標籤頁`);
    
    // 等待所有頁面加載完成
    console.log('等待頁面加載...');
    for (const p of pages) {
      try {
        const url = await p.url();
        console.log('找到頁面:', url);
      } catch (e) {
        console.log('讀取頁面URL失敗:', e.message);
      }
    }
    
    // 尋找Soundraw標籤頁
    let page;
    for (const p of pages) {
      try {
        const url = await p.url();
        if (url.includes('soundraw.io')) {
          console.log('找到Soundraw頁面:', url);
          page = p;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!page) {
      console.log('未找到Soundraw頁面，創建新標籤頁...');
      page = await browser.newPage();
      console.log('正在導航到Soundraw...');
      await page.goto('https://soundraw.io/favorite', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      console.log('頁面加載完成');
    }
    
    console.log('當前頁面 URL:', await page.url());

    await processAllSongs(page);

    await browser.disconnect();
    console.log('👋 已斷開與瀏覽器的連接');

  } catch (error) {
    console.error('❌ 發生錯誤：', error);
    process.exit(1);
  }
})();
