import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./App.scss";

import {
  setChannel,
  saveTicker,
  saveTrades,
  saveNewTrade,
  updateTrade
} from "./redux/reducers/root";
import Ticker from "./components/Ticker";
import Trades from "./components/Trades";

const App = ({
  listen,
  sendMessage,
  setChannel,
  saveTicker,
  saveTrades,
  saveNewTrade,
  updateTrade
}) => {
  useEffect(() => {
    let channelMap = {};

    sendMessage({
      event: "subscribe",
      channel: "trades",
      symbol: "tBTCUSD"
    });

    sendMessage({
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD"
    });

    listen(message => {
      if (message && message.channel) {
        setChannel(message);
        channelMap = { ...channelMap, [message.channel]: message.chanId };
      }

      if (Array.isArray(message)) {
        const [channelId, ...data] = message;
        if (channelMap["ticker"] === channelId && data[0] !== "hb") {
          saveTicker({ channelId, data: data[0] });
        }

        if (channelMap["trades"] === channelId) {
          if (data[0] !== "te" && data[0] !== "tu" && data[0] !== "hb") {
            saveTrades({ channelId, data: data[0] });
          }

          if (data[0] === "te") {
            saveNewTrade({ channelId, data: data[1] });
          }

          if (data[0] === "tu") {
            updateTrade({ channelId, data: data[1] });
          }
        }
      }
    });
  }, [
    listen,
    saveNewTrade,
    saveTicker,
    saveTrades,
    sendMessage,
    setChannel,
    updateTrade
  ]);

  return (
    <div className="app">
      <Ticker />
      <Trades />
    </div>
  );
};

export default connect(
  state => ({
    channels: state.channel
  }),
  dispatch =>
    bindActionCreators(
      { setChannel, saveTicker, saveTrades, saveNewTrade, updateTrade },
      dispatch
    )
)(App);
