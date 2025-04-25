const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');
const fs = require('fs');

// 添加上次记录的歌曲数量
const LAST_RECORDED_SONGS = 76;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 获取 Chrome 默认下载文件夹
const downloadPath = path.join(os.homedir(), 'Downloads');
const progressFile = path.join(__dirname, 'download_progress.json');
const downloadLogFile = path.join(__dirname, 'download_log.json');

// 生成帶時間戳的檔案名稱
function generateTimestampedFilename(originalFilename) {
  // 獲取台灣時間
  const now = new Date();
  const taiwanTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)); // UTC+8
  
  // 格式化時間
  const year = taiwanTime.getUTCFullYear();
  const month = String(taiwanTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(taiwanTime.getUTCDate()).padStart(2, '0');
  const hours = String(taiwanTime.getUTCHours()).padStart(2, '0');
  const minutes = String(taiwanTime.getUTCMinutes()).padStart(2, '0');
  const ampm = taiwanTime.getUTCHours() >= 12 ? 'pm' : 'am';
  
  const timestamp = `${year}-${month}-${day}-${hours}${minutes}${ampm}`;
  
  const ext = path.extname(originalFilename);
  const nameWithoutExt = path.basename(originalFilename, ext);
  return `${nameWithoutExt}_${timestamp}${ext}`;
}

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

// 初始化下載日誌
function initializeDownloadLog() {
  if (!fs.existsSync(downloadLogFile)) {
    console.log('📝 初始化下載日誌...');
    const initialLog = {
      lastTotalSongs: 282,  // 上次記錄為282首
      sessions: [],
      currentSession: {
        startTime: new Date().toISOString(),
        songs: [],
        totalSongs: 0,
        lastPage: 1,
        nextStartIndex: 1
      }
    };
    fs.writeFileSync(downloadLogFile, JSON.stringify(initialLog, null, 2));
    console.log('✅ 下載日誌初始化完成');
    return initialLog;
  }
  return null;
}

// 讀取下載日誌
function loadDownloadLog() {
  // 先檢查是否需要初始化
  const initializedLog = initializeDownloadLog();
  if (initializedLog) {
    return initializedLog;
  }

  try {
    if (fs.existsSync(downloadLogFile)) {
      const data = fs.readFileSync(downloadLogFile, 'utf8');
      const log = JSON.parse(data);
      // 如果文件存在但沒有 lastTotalSongs，設置為282
      if (!log.lastTotalSongs) {
        log.lastTotalSongs = 282;
        saveDownloadLog(log);
      }
      return log;
    }
  } catch (error) {
    console.log('讀取下載日誌失敗:', error.message);
  }
  
  // 如果出現錯誤，返回預設值
  return {
    lastTotalSongs: 282,
    sessions: [],
    currentSession: {
      startTime: new Date().toISOString(),
      songs: [],
      totalSongs: 0,
      lastPage: 1,
      nextStartIndex: 1
    }
  };
}

// 保存下載日誌
function saveDownloadLog(log) {
  try {
    fs.writeFileSync(downloadLogFile, JSON.stringify(log, null, 2));
  } catch (error) {
    console.log('保存下載日誌失敗:', error.message);
  }
}

// 更新當前總歌曲數
function updateTotalSongs(log, totalSongs) {
  log.lastTotalSongs = totalSongs;
  saveDownloadLog(log);
}

// 檢查是否有新歌
async function checkNewSongs(page) {
  const downloadLog = loadDownloadLog();
  const lastTotalSongs = downloadLog.lastTotalSongs;
  
  console.log(`\n📊 上次記錄的歌曲總數: ${lastTotalSongs} 首`);
  
  // 獲取當前總歌曲數
  const currentTotalSongs = await getTotalSongs(page);
  console.log(`📊 當前歌曲總數: ${currentTotalSongs} 首`);
  
  if (currentTotalSongs > lastTotalSongs) {
    const targetNewSongs = currentTotalSongs - lastTotalSongs;
    console.log(`🆕 發現 ${targetNewSongs} 首新歌！`);
    
    // 重置下載會話，從第一首開始下載
    downloadLog.currentSession = {
      startTime: new Date().toISOString(),
      songs: [],
      totalSongs: 0,  // 重置為0
      lastPage: 1,
      nextStartIndex: 1,
      targetNewSongs: targetNewSongs  // 設置目標下載數量
    };
    saveDownloadLog(downloadLog);
    
    return {
      hasNewSongs: true,
      newSongsCount: targetNewSongs,
      currentTotalSongs
    };
  } else {
    console.log('✨ 沒有發現新歌');
    return {
      hasNewSongs: false,
      newSongsCount: 0,
      currentTotalSongs
    };
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
          const timestampedFilename = generateTimestampedFilename(downloadedFile);
          const oldPath = path.join(downloadPath, downloadedFile);
          const newPath = path.join(downloadPath, timestampedFilename);
          
          try {
            fs.renameSync(oldPath, newPath);
            console.log('✅ 检测到新下载的音频文件:', timestampedFilename);
            clearTimeout(timeoutId);
            watcher.close();
            resolve({ filename: timestampedFilename, success: true });
          } catch (error) {
            console.log('❌ 重命名文件失败:', error.message);
            resolve({ filename: downloadedFile, success: true });
          }
        }
      }
    });
    
    timeoutId = setTimeout(() => {
      watcher.close();
      console.log('⚠️ 等待下载超时');
      resolve({ success: false });
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
  let downloadedCount = 0;  // 從0開始計數
  
  // 獲取目標下載數量
  const targetNewSongs = downloadLog.currentSession.targetNewSongs || 0;
  console.log(`🎯 目標下載數量: ${targetNewSongs} 首新歌`);
  console.log(`📝 開始下載第 ${downloadedCount + 1}/${targetNewSongs} 首歌`);

  // 確保回到第一頁
  console.log('🔄 返回第一頁...');
  await page.goto('https://soundraw.io/favorite?page=1', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('\n📑 開始下載新歌');
  await page.waitForSelector('#gtm-track-download-btn', { timeout: 10000 });
  
  // 遍歷每一頁
  let currentPage = 1;
  
  while (downloadedCount < targetNewSongs) {
    console.log(`\n📄 正在處理第 ${currentPage} 頁`);
    const downloadBtns = await page.$$('#gtm-track-download-btn');
    
    // 處理當前頁面的歌曲
    for (let i = 0; i < downloadBtns.length && downloadedCount < targetNewSongs; i++) {
      try {
        const btn = downloadBtns[i];
        const songTitle = await getSongTitle(btn);
        
        const currentSongNumber = downloadedCount + 1;
        console.log(`\n▶️ 處理第 ${currentSongNumber}/${targetNewSongs} 首新歌${songTitle ? ': ' + songTitle : ''}`);

        await btn.evaluate(b => b.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        await new Promise(r => setTimeout(r, 800));

        await btn.click();
        await new Promise(r => setTimeout(r, 1500));

        const mp3Btn = await page.$('button.primary-btn');

        if (!mp3Btn) {
          console.log('等待當前下載完成...');
          const result = await waitForFileDownload();
          if (result.success) {
            downloadedCount++;
            console.log(`✅ 已下載 ${downloadedCount}/${targetNewSongs} 首歌`);
            
            // 更新下載記錄
            downloadLog.currentSession.songs.push({
              title: songTitle,
              page: currentPage,
              index: i + 1,
              downloadTime: new Date().toISOString(),
              filename: result.filename
            });
            downloadLog.currentSession.totalSongs = downloadedCount;
            saveDownloadLog(downloadLog);
          }
          continue;
        }

        await mp3Btn.click();
        const result = await waitForFileDownload();
        if (result.success) {
          downloadedCount++;
          console.log(`✅ 已下載 ${downloadedCount}/${targetNewSongs} 首歌`);
          
          // 更新下載記錄
          downloadLog.currentSession.songs.push({
            title: songTitle,
            page: currentPage,
            index: i + 1,
            downloadTime: new Date().toISOString(),
            filename: result.filename
          });
          downloadLog.currentSession.totalSongs = downloadedCount;
          saveDownloadLog(downloadLog);
        }

      } catch (error) {
        console.log(`❌ 處理第 ${downloadedCount + 1} 首歌時出錯:`, error.message);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
    
    // 檢查是否需要進入下一頁
    if (downloadedCount < targetNewSongs) {
      const hasNext = await hasNextPage(page);
      if (!hasNext) break;
      
      await goToNextPage(page);
      currentPage++;
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log('\n✅ 新歌下載完成！');
}

async function getTotalSongs(page) {
  try {
    // 等待歌曲元素載入
    await page.waitForSelector('#gtm-track-download-btn', { timeout: 30000 });
    
    // 獲取總頁數
    const totalPages = await page.evaluate(() => {
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
    
    console.log(`📑 總共有 ${totalPages} 頁`);
    
    // 如果只有一頁，直接返回當前頁面的歌曲數量
    if (totalPages === 1) {
      const songsOnPage = await page.$$eval('#gtm-track-download-btn', buttons => buttons.length);
      console.log(`🎵 收藏夾中總共有 ${songsOnPage} 首歌`);
      return songsOnPage;
    }
    
    // 計算完整頁面的歌曲總數（除最後一頁外）
    const fullPagesCount = totalPages - 1;
    const songsOnFullPages = fullPagesCount * 15;
    console.log(`📊 前 ${fullPagesCount} 頁共有 ${songsOnFullPages} 首歌 (每頁15首)`);
    
    // 檢查最後一頁
    console.log(`\n📄 檢查最後一頁 (第 ${totalPages} 頁)...`);
    await page.goto(`https://soundraw.io/favorite?page=${totalPages}`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#gtm-track-download-btn', { timeout: 30000 });
    
    const songsOnLastPage = await page.$$eval('#gtm-track-download-btn', buttons => buttons.length);
    console.log(`📊 最後一頁有 ${songsOnLastPage} 首歌`);
    
    // 計算總數
    const totalSongs = songsOnFullPages + songsOnLastPage;
    console.log(`\n🎵 收藏夾中總共有 ${totalSongs} 首歌`);
    return totalSongs;
    
  } catch (error) {
    console.log('❌ 檢查歌曲數量時出錯:', error.message);
    return 0;
  }
}

async function checkAndWaitForLogin(page) {
  console.log('🔐 檢查登入狀態...');
  
  // 確保在收藏頁面
  const url = await page.url();
  if (!url.includes('/favorite')) {
    console.log('🔄 導航到收藏頁面...');
    await page.goto('https://soundraw.io/favorite', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
  }
  
  // 檢查是否需要登入
  const needLogin = await page.evaluate(() => {
    return document.querySelector('.login-button') !== null ||
           document.querySelector('form[action="/users/sign_in"]') !== null;
  });
  
  if (needLogin) {
    console.log('⚠️ 請先登入 Soundraw');
    console.log('1. 請在瀏覽器中完成登入');
    console.log('2. 登入後會自動返回收藏頁面');
    console.log('3. 等待頁面完全載入');
    
    // 等待登入完成（頁面上出現下載按鈕）
    await page.waitForSelector('#gtm-track-download-btn', { timeout: 300000 }); // 5分鐘超時
    console.log('✅ 已成功登入並進入收藏頁面');
  }
  
  return true;
}

async function downloadFavoriteSongs() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
    defaultViewport: null
  });

  try {
    console.log('🔍 正在連接到 Chrome...');
    console.log('正在檢查Chrome調試端口...');
    console.log('✅ 成功連接到 Chrome');

    const pages = await browser.pages();
    let page = pages.find(p => p.url().includes('soundraw.io'));
    
    if (!page) {
      console.log('未找到Soundraw頁面，正在創建新頁面...');
      page = await browser.newPage();
      await page.goto('https://soundraw.io/favorite');
    } else {
      console.log(`找到頁面: ${page.url()}`);
      if (!page.url().includes('/favorite')) {
        console.log('導航到收藏頁面...');
        await page.goto('https://soundraw.io/favorite');
      }
      console.log(`找到Soundraw頁面: ${page.url()}`);
    }

    console.log('🔐 檢查登入狀態...');
    await delay(2000);

    // 獲取當前頁面的歌曲數量
    const songsOnPage = await page.$$eval('#gtm-track-download-btn', buttons => buttons.length);
    
    // 獲取總頁數
    const totalPages = await page.evaluate(() => {
      const paginationText = document.querySelector('.pagination-text')?.textContent;
      if (paginationText) {
        const match = paginationText.match(/(\d+)\s*頁/);
        return match ? parseInt(match[1]) : 1;
      }
      return 1;
    });

    console.log(`\n📊 上次記錄的歌曲總數: ${LAST_RECORDED_SONGS} 首`);
    console.log(`📊 當前頁面有 ${songsOnPage} 首歌`);
    console.log(`📑 總共有 ${totalPages} 頁\n`);

    // ... rest of the code ...
  } catch (error) {
    console.error('發生錯誤:', error);
  }
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
    
    // 尋找或創建 Soundraw 頁面
    let page = await findOrCreateSoundrawPage(browser);
    
    // 檢查是否有新歌
    const { hasNewSongs, newSongsCount, currentTotalSongs } = await checkNewSongs(page);
    
    // 如果是第一次運行或需要初始化已下載狀態
    const downloadLog = loadDownloadLog();
    if (downloadLog.lastTotalSongs === 0) {
      console.log('\n⚠️ 初始化下載記錄...');
      console.log(`📝 記錄當前 ${currentTotalSongs} 首歌為已下載狀態`);
      updateTotalSongs(downloadLog, currentTotalSongs);
      console.log('✅ 初始化完成！下次執行時將只下載新增的歌曲');
    }
    // 如果有新歌才執行下載
    else if (hasNewSongs) {
      console.log('\n🎵 開始下載新歌...');
      console.log(`⏳ 將只下載前 ${newSongsCount} 首新歌`);
      
      // 修改下載進度，只下載新歌
      downloadLog.currentSession = {
        startTime: new Date().toISOString(),
        songs: [],
        totalSongs: 0,
        lastPage: 1,
        nextStartIndex: 1,
        targetNewSongs: newSongsCount
      };
      saveDownloadLog(downloadLog);
      
      // 開始下載流程
    await processAllSongs(page);
      
      // 更新總歌曲數
      updateTotalSongs(downloadLog, currentTotalSongs);
    }

    await browser.disconnect();
    console.log('👋 已斷開與瀏覽器的連接');

  } catch (error) {
    console.error('❌ 發生錯誤：', error);
    process.exit(1);
  }
})();

// 輔助函數：尋找或創建 Soundraw 頁面
async function findOrCreateSoundrawPage(browser) {
  console.log('等待頁面加載...');
  const pages = await browser.pages();
  
  // 尋找Soundraw標籤頁
  for (const p of pages) {
    try {
      const url = await p.url();
      console.log('找到頁面:', url);
      if (url.includes('soundraw.io')) {
        console.log('找到Soundraw頁面:', url);
        await checkAndWaitForLogin(p);
        return p;
      }
    } catch (e) {
      continue;
    }
  }

  console.log('未找到Soundraw頁面，創建新標籤頁...');
  const page = await browser.newPage();
  console.log('正在導航到Soundraw收藏頁面...');
  await page.goto('https://soundraw.io/favorite', { 
    waitUntil: 'networkidle2',
    timeout: 30000 
  });
  await checkAndWaitForLogin(page);
  console.log('頁面加載完成');
  return page;
}
