import React, { useMemo } from "react";
import { connect } from "react-redux";
import numbro from "numbro";
import classnames from "classnames";

import "./Ticker.scss";

const Ticker = ({ channels }) => {
  const tickerChannelId = useMemo(
    () =>
      Object.keys(channels).find(
        channelId => channels[channelId].name === "ticker"
      ),
    [channels]
  );
  const ticker = channels[tickerChannelId] || {};
  const [
    ,
    ,
    ,
    ,
    DAILY_CHANGE,
    DAILY_CHANGE_PERC,
    LAST_PRICE,
    VOLUME,
    HIGH,
    LOW
  ] = ticker.data || [];

  const dailyChange = useMemo(
    () => numbro(Math.abs(DAILY_CHANGE)).format({ mantissa: 2 }),
    [DAILY_CHANGE]
  );

  const dailyChangePerc = useMemo(
    () =>
      numbro(Math.abs(DAILY_CHANGE_PERC)).format({
        output: "percent",
        mantissa: 2
      }),
    [DAILY_CHANGE_PERC]
  );

  const lastPrice = useMemo(
    () => numbro(LAST_PRICE).format({ thousandSeparated: true, mantissa: 0 }),
    [LAST_PRICE]
  );

  const volume = useMemo(
    () =>
      numbro(VOLUME * 10000).format({
        thousandSeparated: true,
        mantissa: 0
      }),
    [VOLUME]
  );

  const low = useMemo(() => numbro(LOW).format({ thousandSeparated: true }), [
    LOW
  ]);

  const high = useMemo(() => numbro(HIGH).format({ thousandSeparated: true }), [
    HIGH
  ]);

  return (
    <div className="ticker">
      <div className="ticker-col">
        <img
          className="ticker-currency"
          src="https://www.bitfinex.com/assets/BTC-alt-1ca8728fcf2bc179dfe11f9a0126bc303bee888bff8132c5ff96a4873cf9f0fb.svg"
          alt="btc"
        />
      </div>
      <div className="ticker-col">
        <p className="ticker-title ticker-underlined">BTC/USD</p>
        <p className="ticker-text">
          <span className="ticker-text show-soft">VOL&nbsp;</span>
          <span className="ticker-underline">{volume}</span>
          <span className="ticker-text show-soft">&nbsp;USD</span>
        </p>
        <p className="ticker-text">
          <span className="ticker-text show-soft">LOW&nbsp;</span>
          <span>{low}</span>
        </p>
      </div>
      <div className="ticker-col">
        <p className="ticker-title">{lastPrice}</p>
        <p
          className={classnames("ticker-text", {
            success: DAILY_CHANGE > 0,
            error: DAILY_CHANGE < 0
          })}
        >
          {dailyChange}
          {DAILY_CHANGE > 0 ? <span>&uarr;</span> : <span>&darr;</span>}(
          {dailyChangePerc})
        </p>
        <p className="ticker-text">
          <span className="ticker-text show-soft">HIGH&nbsp;</span>
          <span>{high}</span>
        </p>
      </div>
    </div>
  );
};

export default connect(state => ({
  channels: state.channel
}))(Ticker);
