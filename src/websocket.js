export const setupWebsocket = url =>
  new Promise(resolve => {
    const webSocket = new WebSocket(url);

    const listen = cb =>
      (webSocket.onmessage = event => cb(JSON.parse(event.data)));

    const sendMessage = message => webSocket.send(JSON.stringify(message));

    webSocket.onopen = () => {
      resolve({ listen, sendMessage });
    };
  });
