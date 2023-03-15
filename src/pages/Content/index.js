window.addEventListener(
  'message',
  (event) => {
    if (event.source !== window) {
      return;
    }

    if (event.data.type === 'DECENTRL_REQUEST_IDENTITY_AUTHORIZATION') {
      chrome.runtime.sendMessage(event.data);
    }
  },
  false
);

window.decentrl = 'hello there!'

chrome.runtime.onMessage.addListener((message, callback) => {
  window.postMessage(message);
});
