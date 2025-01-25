// Create right-click menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateHumblebrag",
    title: "Generate LinkedIn humblebrag",
    contexts: ["selection"]
  });
});

// Handle text selection
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "generateHumblebrag") {
    const selectedText = info.selectionText;
    
    // Store text temporarily
    chrome.storage.local.set({ selectedText }, async () => {
      // Open popup
      chrome.action.openPopup();
    });
  }
});
