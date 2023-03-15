import { useLoginRequestStore } from '../Popup/store/login-request.store';

chrome.runtime.onMessage.addListener(async (message, callback) => {
  if (callback.tab) {
    if (message.type === 'DECENTRL_REQUEST_IDENTITY_AUTHORIZATION') {
      await chrome.storage.session.set({
        'login-request': JSON.stringify({
          tabId: callback.tab.id,
          url: message.url,
        }),
      });

      useLoginRequestStore.getState().setData(message.url, callback.tab.id);

      const window = await chrome.windows.get(callback.tab.windowId);

      chrome.windows.create({
        url: 'popup.html',
        type: 'popup',
        width: 400,
        height: 300,
        top: window.top,
        left: window.left + (window.width - 400),
      });
    }
  }

  if (message.type === 'DECENTRL_REQUEST_IDENTITY_AUTHORIZATION_RESPONSE') {
    const loginRequestStore = useLoginRequestStore.getState();

    await chrome.tabs.sendMessage(loginRequestStore.tabId, message);
  }
});
