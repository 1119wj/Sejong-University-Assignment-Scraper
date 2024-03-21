

  chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload()
  });
  
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      for (const key of Object.keys(changes)) {
        console.log(`storage.local.${key} changed`)
      }
    }
  });
  
  const logo = chrome.runtime.getURL('/src/assets/img/main.png');
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "createNotification") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: logo,
        title: message.title,
        message: message.message,
      });
    }
  });
  

  export {}