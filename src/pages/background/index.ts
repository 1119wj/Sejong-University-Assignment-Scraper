

  chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload()
  })
  
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      for (const key of Object.keys(changes)) {
        console.log(`storage.local.${key} changed`)
      }
    }
  })
  
  export {}