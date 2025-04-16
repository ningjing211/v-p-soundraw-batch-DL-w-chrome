const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 获取 Chrome 默认下载文件夹
const downloadPath = path.join(os.homedir(), 'Downloads');

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
  
  // 获取下载前的文件列表
  const beforeFiles = new Set(fs.readdirSync(downloadPath));
  
  return new Promise((resolve) => {
    let timeoutId;
    const watcher = fs.watch(downloadPath, (eventType, filename) => {
      if (eventType === 'rename' && filename) {  // 新文件创建事件
        const currentFiles = new Set(fs.readdirSync(downloadPath));
        const newFiles = [...currentFiles].filter(x => !beforeFiles.has(x));
        
        // 检查是否有新的 .m4a 或 .mp3 文件
        const newAudioFiles = newFiles.filter(file => 
          file.endsWith('.m4a') || file.endsWith('.mp3')
        );
        
        if (newAudioFiles.length > 0) {
          console.log('✅ 检测到新下载的音频文件:', newAudioFiles[0]);
          clearTimeout(timeoutId);
          watcher.close();
          resolve(true);
        }
      }
    });
    
    // 设置超时（2分钟）
    timeoutId = setTimeout(() => {
      watcher.close();
      console.log('⚠️ 等待下载超时');
      resolve(false);
    }, 120000);
  });
}

async function processPage(page, pageNum) {
  console.log(`\n📄 正在处理第 ${pageNum} 页...`);
  
  // 前往对应页面
  await page.goto(`https://soundraw.io/favorite?page=${pageNum}`, { 
    waitUntil: 'networkidle2',
    timeout: 30000 
  });

  // 等待页面加载
  const isLoaded = await waitForPageLoad(page);
  if (!isLoaded) {
    console.log('❌ 页面加载失败，请确保已登录 Soundraw');
    return false;
  }

  // 检查是否有下载按钮
  const buttons = await page.$$('button#gtm-track-download-btn');
  if (!buttons || buttons.length === 0) {
    console.log('🔍 当前页面没有发现下载按钮，可能已经处理完所有页面');
    return false;
  }

  console.log(`🎵 发现 ${buttons.length} 首歌`);

  for (let i = 0; i < buttons.length; i++) {
    try {
      const button = buttons[i];
      console.log(`\n▶️ 处理第 ${i + 1}/${buttons.length} 首歌...`);
      
      // 确保按钮在视图中
      await button.evaluate(b => {
        b.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      await delay(800);
      
      // 点击下载按钮
      await button.click();
      await delay(1500);

      // 等待并点击 MP3 按钮
      const mp3Btn = await page.waitForSelector('button.primary-btn', {
        visible: true,
        timeout: 5000
      });
      
      if (!mp3Btn) {
        throw new Error('找不到 MP3 下载按钮');
      }

      await mp3Btn.click();
      await delay(2000);
      
      console.log(`✅ 第 ${i + 1} 首 MP3 触发成功`);
    } catch (err) {
      console.warn(`⚠️ 第 ${i + 1} 首失败：${err.message}`);
      // 关闭可能打开的下载弹窗
      try {
        const closeBtn = await page.$('button.close-btn');
        if (closeBtn) {
          await closeBtn.click();
          await delay(500);
        }
      } catch (e) {}
    }
  }

  return true;
}

async function processAllSongs(page) {
  // 获取所有下载按钮
  console.log('正在查找所有下载按钮...');
  const downloadBtns = await page.$$('button#gtm-track-download-btn');
  console.log(`找到 ${downloadBtns.length} 个下载按钮`);

  for (let i = 0; i < downloadBtns.length; i++) {
    try {
      const btn = downloadBtns[i];
      console.log(`\n▶️ 处理第 ${i + 1}/${downloadBtns.length} 首歌...`);

      // 滚动到按钮位置
      await btn.evaluate(b => b.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      await new Promise(r => setTimeout(r, 800));

      // 点击下载按钮
      console.log('点击下载按钮');
      await btn.click();
      await new Promise(r => setTimeout(r, 1500));

      // 查找 MP3 按钮
      console.log('查找 MP3 按钮');
      const mp3Btn = await page.$('button.primary-btn');

      if (!mp3Btn) {
        // 如果没有找到 MP3 按钮，说明可能正在下载中
        console.log('未发现 MP3 按钮，等待当前下载完成...');
        await waitForFileDownload();
        continue;
      }

      // 找到了 MP3 按钮，点击它
      console.log('点击 MP3 按钮');
      await mp3Btn.click();
      
      // 等待文件下载完成
      await waitForFileDownload();

    } catch (error) {
      console.log(`❌ 处理第 ${i + 1} 首歌时出错:`, error.message);
      // 等待一段时间后继续
      await new Promise(r => setTimeout(r, 5000));
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
