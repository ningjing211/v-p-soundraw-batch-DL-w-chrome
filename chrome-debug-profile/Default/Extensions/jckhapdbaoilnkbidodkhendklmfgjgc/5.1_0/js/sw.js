const CONTEXT_MENU_SELECTION = 'ctx_string';
const CONTEXT_MENU_PAGE = 'ctx_page';
const CONTEXT_MENU_LINK = 'ctx_link';
const CONTEXT_MENU_SCANNER = 'ctx_scan';
const SCAN_RESULT = 'scan_result';
const ACTION_SHARE_FB = 'action_share_fb';
const ACTION_SHARE_TW = 'action_share_tw';


// context menus on clicked
async function onContextMenusClick(info) {
  const {
    menuItemId,
    linkUrl,
    pageUrl,
    selectionText,
    srcUrl,
  } = info;
  // return;
  switch (menuItemId) {
    case CONTEXT_MENU_SELECTION:

    case ACTION_SHARE_FB:
    {
      const url = 'https://www.facebook.com/sharer/sharer.php?u=https://chromewebstore.google.com/detail/simplified-traditional-ch/jckhapdbaoilnkbidodkhendklmfgjgc'
      await chrome.tabs.create({ url });
    }
      break;

    case ACTION_SHARE_TW:
    {
      const url = 'https://twitter.com/intent/tweet?text=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fsimplified-traditional-ch%2Fjckhapdbaoilnkbidodkhendklmfgjgc';
      await chrome.tabs.create({ url });
    }
      break;
  }
}

// chrome.runtime.setUninstallURL('https://high-qr-code-generator.com/exit-survey.html');
// chrome.storage.onChanged.addListener(onChanged);
// const initKeys = ['theme', 'hasContextMenu', 'hasScanner']
// chrome.storage.local.get(initKeys, function(result) {
//   const newResult = {};
//   for (const key of initKeys) {
//     newResult[ key ] = {
//       newValue: result[ key ] ?? true,
//     };
//   }
//   onChanged(newResult);
// });
chrome.contextMenus.onClicked.addListener(onContextMenusClick);

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: ACTION_SHARE_FB,
    'title': chrome.i18n.getMessage('share_on_fb'),
    'contexts': ['action'],
  });
  chrome.contextMenus.create({
    id: ACTION_SHARE_TW,
    'title': chrome.i18n.getMessage('share_on_tw'),
    'contexts': ['action'],
  });
});
