import React, { useMemo } from "react";
import { connect } from "react-redux";
import moment from "moment";
import numbro from "numbro";
import classnames from "classnames";
import "./Trades.scss";

const Trades = ({ channels }) => {
  const tradesChannelId = useMemo(
    () =>
      Object.keys(channels).find(
        channelId => channels[channelId].name === "trades"
      ),
    [channels]
  );
  const trades = channels[tradesChannelId];

  const formatAmount = amount =>
    numbro(Math.abs(amount).toFixed(4)).format({ trimMantissa: true });

  return (
    <div className="trades">
      <div className="trades-title">
        TRADES <span className="show-soft">BTC/USD</span>
      </div>
      {trades && (
        <table className="trades-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }} />
              <th
                style={{ width: "25%" }}
                className="trades-table__head show-soft"
              >
                TIME
              </th>
              <th
                style={{ width: "25%" }}
                className="trades-table__head show-soft"
              >
                PRICE
              </th>
              <th
                style={{ width: "45%" }}
                className="trades-table__head show-soft"
              >
                AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            {trades.data.map(([id, timestamp, amount, price], i) => {
              const formattedAmount = formatAmount(amount);
              const isBiggerThenBefore =
                trades.data[i + 1] && trades.data[i + 1][3] <= price;
              return (
                <tr
                  key={id}
                  className={classnames("trades-table__row", {
                    success: isBiggerThenBefore,
                    error: !isBiggerThenBefore
                  })}
                >
                  <td>
                    {isBiggerThenBefore ? (
                      <span className="trades-table__arrow">&uarr;</span>
                    ) : (
                      <span className="trades-table__arrow">&darr;</span>
                    )}
                  </td>
                  <td className="trades-table__cell">
                    {moment(timestamp).format("HH:mm:ss")}
                  </td>
                  <td className="trades-table__cell">
                    {numbro(price).format({
                      thousandSeparated: true,
                      mantissa: 0
                    })}{" "}
                  </td>
                  <td className="trades-table__cell">
                    {formattedAmount}
                    {formattedAmount.length < 6 && (
                      <span className="trades-trailing-zeros">
                        {Array.from({ length: 6 - formattedAmount.length })
                          .fill("0")
                          .join("")}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default connect(state => ({
  channels: state.channel
}))(Trades);
