const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');
const fs = require('fs');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 記錄用戶操作
async function recordUserActions(page) {
  console.log('📝 開始記錄用戶操作...');
  
  const actions = [];
  
  // 記錄點擊事件
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('click', e => {
      const element = e.target;
      const tagName = element.tagName.toLowerCase();
      const className = element.className;
      const id = element.id;
      const text = element.textContent;
      const href = element.href;
      
      // 發送事件到 Node.js
      window.postMessage({
        type: 'CLICK',
        data: {
          tagName,
          className,
          id,
          text,
          href,
          timestamp: new Date().toISOString()
        }
      }, '*');
    }, true);
  });
  
  // 監聽頁面消息
  page.on('console', msg => {
    console.log('🖥️ 頁面日誌:', msg.text());
  });
  
  // 監聽用戶操作
  page.on('pageerror', error => {
    console.log('❌ 頁面錯誤:', error.message);
  });
  
  // 記錄點擊事件
  page.on('domcontentloaded', () => {
    console.log('📄 頁面已加載');
  });
  
  return new Promise((resolve) => {
    let actionTimeout;
    
    // 監聽用戶操作事件
    page.on('framenavigated', frame => {
      if (frame === page.mainFrame()) {
        const url = frame.url();
        actions.push({
          type: 'NAVIGATION',
          url,
          timestamp: new Date().toISOString()
        });
        console.log('🔄 頁面導航到:', url);
      }
    });
    
    // 監聽點擊事件
    page.on('domcontentloaded', () => {
      page.evaluate(() => {
        document.addEventListener('click', e => {
          const element = e.target;
          window.postMessage({
            type: 'CLICK',
            selector: element.tagName.toLowerCase() +
              (element.id ? '#' + element.id : '') +
              (element.className ? '.' + element.className.split(' ').join('.') : '')
          }, '*');
        }, true);
      });
    });
    
    // 接收頁面消息
    page.on('console', msg => {
      if (msg.type() === 'log') {
        const text = msg.text();
        if (text.includes('CLICK:')) {
          actions.push({
            type: 'CLICK',
            selector: text.split('CLICK:')[1].trim(),
            timestamp: new Date().toISOString()
          });
          console.log('🖱️ 點擊:', text.split('CLICK:')[1].trim());
          
          // 重置超時
          clearTimeout(actionTimeout);
          actionTimeout = setTimeout(() => {
            console.log('⏱️ 操作記錄完成');
            resolve(actions);
          }, 10000); // 10 秒無操作後結束記錄
        }
      }
    });
  });
}

async function clickGenreTags(page, genres) {
  console.log('等待音樂類型標籤加載...');
  
  // 等待標籤容器加載
  await page.waitForSelector('div[data-v-54a4f178].show-parameter.row', { 
    timeout: 10000 
  });
  
  for (const genre of genres) {
    console.log(`點擊 ${genre} 標籤...`);
    
    // 使用更精確的選擇器
    const selector = genre === 'City Pop' 
      ? 'div.parameter-value.genre-parameter input[id="genre-Tokyo night pop"]'
      : `div.parameter-value.genre-parameter input[id="genre-${genre}"]`;
    
    // 等待標籤可點擊
    await page.waitForSelector(selector, { 
      visible: false,  // input 是隱藏的
      timeout: 10000 
    });
    
    // 使用 JavaScript 點擊標籤
    await page.evaluate((sel, genreName) => {
      const input = document.querySelector(sel);
      if (!input) {
        console.error(`找不到 ${genreName} 標籤`);
        return false;
      }
      
      // 獲取對應的 label
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label) {
        console.error(`找不到 ${genreName} 標籤的 label`);
        return false;
      }
      
      // 點擊 label
      label.click();
      return true;
    }, selector, genre);
    
    // 等待頁面穩定
    await page.waitForFunction(() => {
      return !document.querySelector('.loading-spinner') && 
             document.readyState === 'complete';
    }, { timeout: 10000 });
    
    await delay(1000); // 等待點擊效果
  }
  
  console.log('所有標籤點擊完成');
}

async function clickGenerateButton(page) {
  console.log('等待生成按鈕出現...');
  
  // 使用更精確的選擇器等待按鈕
  const buttonSelector = 'button#generate-music-button.primary-btn.md.bright-blue';
  await page.waitForSelector(buttonSelector, { visible: true, timeout: 10000 });
  
  console.log('點擊生成按鈕...');
  
  // 使用 evaluate 確保按鈕可以被點擊
  await page.evaluate(() => {
    const button = document.querySelector('button#generate-music-button');
    if (!button) {
      console.error('找不到生成按鈕');
      return false;
    }
    
    // 檢查按鈕是否在視窗內
    const rect = button.getBoundingClientRect();
    if (rect.top < 0 || rect.left < 0 || 
        rect.bottom > window.innerHeight || 
        rect.right > window.innerWidth) {
      button.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return true;
  });
  
  // 等待一下確保滾動完成
  await delay(1000);
  
  // 嘗試點擊
  try {
    await Promise.all([
      page.click(buttonSelector),
      page.waitForResponse(response => response.url().includes('/api/') && response.status() === 200, { timeout: 10000 })
    ]);
    console.log('已點擊生成按鈕，等待響應...');
  } catch (error) {
    console.error('點擊按鈕時發生錯誤:', error);
    
    // 如果常規點擊失敗，嘗試使用 JavaScript 點擊
    await page.evaluate(() => {
      const button = document.querySelector('button#generate-music-button');
      if (button) button.click();
    });
  }
  
  await delay(5000); // 等待生成開始
}

async function addToFavorites(page, count = 6, startIndex = 0) {
  console.log(`準備從第 ${startIndex + 1} 首開始收藏 ${count} 首歌曲`);
  await delay(3000); // 等待歌曲列表加載

  // 等待收藏按鈕出現
  await page.waitForSelector('.gtm-track-favorite-modal-btn', { timeout: 30000 });
  
  // 獲取所有收藏按鈕
  const favoriteButtons = await page.$$('.gtm-track-favorite-modal-btn');
  console.log(`找到 ${favoriteButtons.length} 個收藏按鈕`);

  // 從指定索引開始點擊收藏按鈕
  for (let i = startIndex; i < Math.min(startIndex + count, favoriteButtons.length); i++) {
    console.log(`準備收藏第 ${i + 1} 首歌曲`);
    
    // 等待確保當前按鈕可以點擊
    await page.waitForFunction(
      (index) => {
        const buttons = document.querySelectorAll('.gtm-track-favorite-modal-btn');
        const button = buttons[index];
        if (!button) return false;
        
        // 檢查按鈕是否可見且可點擊
        const rect = button.getBoundingClientRect();
        const style = window.getComputedStyle(button);
        
        return rect.width > 0 && 
               rect.height > 0 && 
               style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               !button.disabled &&
               // 確保沒有其他收藏對話框開啟
               !document.querySelector('#gtm-track-favorite-add-btn');
      },
      { timeout: 10000 },
      i
    );
    
    console.log(`收藏第 ${i + 1} 首歌曲`);
    
    // 點擊收藏按鈕
    await favoriteButtons[i].click();
    await delay(1000);
    
    // 等待並點擊確認按鈕
    try {
      // 等待確認按鈕出現
      await page.waitForSelector('#gtm-track-favorite-add-btn', { 
        visible: true,
        timeout: 5000 
      });
      
      // 點擊確認按鈕
      await page.click('#gtm-track-favorite-add-btn');
      
      // 等待確認按鈕消失，表示收藏完成
      await page.waitForFunction(
        () => !document.querySelector('#gtm-track-favorite-add-btn'),
        { timeout: 5000 }
      );
      
      console.log(`✅ 第 ${i + 1} 首歌曲收藏成功`);
      
      // 額外等待一下，確保系統完全處理完這次收藏
      await delay(1500);
      
    } catch (error) {
      console.log(`❌ 第 ${i + 1} 首歌曲收藏失敗：${error.message}`);
      i--; // 重試這首歌
      await delay(2000); // 等待一下再重試
      continue;
    }
  }
}

async function clickGenerateMore(page) {
  console.log('點擊生成更多音樂按鈕...');
  await page.waitForSelector('#gtm-track-generate-more-btn');
  await page.click('#gtm-track-generate-more-btn');
  
  console.log('等待新音樂生成中...');
  await delay(5000);
  
  // 等待並檢查第7首歌是否生成
  let retryCount = 0;
  const maxRetries = 10;
  
  while (retryCount < maxRetries) {
    console.log(`檢查第 ${retryCount + 1} 次：是否已生成第7首歌...`);
    
    const seventhSongExists = await page.evaluate(() => {
      const songs = document.querySelectorAll('.music-composition');
      const seventhSong = Array.from(songs).find(song => {
        const numberSpan = song.querySelector('span.text-white.music-pool-text');
        return numberSpan && numberSpan.textContent.trim() === '0007';
      });
      return !!seventhSong;
    });

    if (seventhSongExists) {
      console.log('✅ 第7首歌已生成完成！');
      return true;
    }

    console.log('第7首歌尚未生成，等待3秒後重試...');
    await delay(3000);
    retryCount++;
  }

  console.log('❌ 等待超時：第7首歌可能未成功生成');
  return false;
}

async function autoFavorite(targetSongs = 300) {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('soundraw.io')) || await browser.newPage();
  
  try {
    // 確保在 edit_music 頁面
    if (!page.url().includes('/edit_music')) {
      console.log('導航到音樂編輯頁面...');
      await page.goto('https://soundraw.io/edit_music');
      await delay(3000);
    }

    // 等待標籤容器加載
    console.log('等待音樂類型標籤加載...');
    await page.waitForSelector('div[data-v-54a4f178].show-parameter.row');
    await delay(2000);

    // 確認所有需要的標籤存在
    const tagsExist = await page.evaluate(() => {
      const reggaeTag = document.querySelector('label[for="genre-Reggae"]');
      const cityPopTag = Array.from(document.querySelectorAll('label')).find(el => el.textContent === 'City Pop');
      const funkTag = document.querySelector('label[for="genre-Funk"]');
      const lofiHipHopTag = document.querySelector('label[for="genre-Lofi Hip Hop"]');
      const worldTag = document.querySelector('label[for="genre-World"]');
      
      return {
        reggae: !!reggaeTag,
        cityPop: !!cityPopTag,
        funk: !!funkTag,
        lofiHipHop: !!lofiHipHopTag,
        world: !!worldTag
      };
    });

    console.log('標籤狀態:', tagsExist);

    if (!tagsExist.reggae || !tagsExist.cityPop || !tagsExist.funk || 
        !tagsExist.lofiHipHop || !tagsExist.world) {
      throw new Error('未找到必要的音樂類型標籤');
    }

    await clickGenreTags(page, ['Reggae', 'City Pop', 'Funk', 'Lofi Hip Hop', 'World']);
    await clickGenerateButton(page);
    
    let favoritedSongs = 0;
    let currentIndex = 0;
    let batchCount = 1;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (favoritedSongs < targetSongs) {
      const remainingSongs = targetSongs - favoritedSongs;
      const songsToFavorite = Math.min(6, remainingSongs);
      
      console.log(`\n===== 第 ${batchCount} 批次 =====`);
      console.log(`總進度: ${favoritedSongs}/${targetSongs} 首 (${(favoritedSongs/targetSongs*100).toFixed(1)}%)`);
      console.log(`本批次: 從第 ${currentIndex + 1} 首開始收藏 ${songsToFavorite} 首\n`);
      
      await addToFavorites(page, songsToFavorite, currentIndex);
      favoritedSongs += songsToFavorite;
      batchCount++;
      
      if (favoritedSongs < targetSongs) {
        console.log('\n準備生成下一批次音樂...');
        const moreGenerated = await clickGenerateMore(page);
        if (!moreGenerated) {
          retryCount++;
          console.log(`無法生成更多音樂，第 ${retryCount}/${maxRetries} 次重試...`);
          
          if (retryCount >= maxRetries) {
            console.log('達到最大重試次數，停止收藏');
            break;
          }
          
          // 重新點擊標籤和生成按鈕
          await clickGenreTags(page, ['Reggae', 'City Pop', 'Funk', 'Lofi Hip Hop', 'World']);
          await clickGenerateButton(page);
          await delay(5000);
          
          // 重置索引
          currentIndex = 0;
          continue;
        }
        retryCount = 0; // 成功生成後重置重試計數
        currentIndex = favoritedSongs; // 從上一批次的下一首開始
      }
    }
    
    console.log(`\n🎉 完成收藏 ${favoritedSongs} 首歌曲！`);
    console.log(`總共執行了 ${batchCount - 1} 個批次`);
  } catch (error) {
    console.error('發生錯誤:', error);
  } finally {
    await browser.disconnect();
  }
}

autoFavorite(300);