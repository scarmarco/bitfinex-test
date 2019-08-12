import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import { setupWebsocket } from "./websocket";

setupWebsocket("wss://api-pub.bitfinex.com/ws/2").then(
  ({ listen, sendMessage }) =>
    ReactDOM.render(
      <Provider store={store}>
        <App listen={listen} sendMessage={sendMessage} />
      </Provider>,
      document.getElementById("root")
    )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
