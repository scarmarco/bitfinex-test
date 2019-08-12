export const SET_CHANNEL = "SET_CHANNEL";
export const SAVE_TICKER = "SAVE_TICKER";
export const SAVE_TRADES = "SAVE_TRADES";
export const SAVE_NEW_TRADE = "SAVE_NEW_TRADE";
export const UPDATE_TRADE = "UPDATE_TRADE";

const initialState = {
  channel: {}
};

export default function ws(state = initialState, action) {
  switch (action.type) {
    case SET_CHANNEL: {
      const { channel, chanId } = action.payload;
      return {
        ...state,
        channel: {
          ...state.channel,
          [chanId]: {
            name: channel,
            data: []
          }
        }
      };
    }

    case SAVE_TRADES:
    case SAVE_TICKER: {
      const { channelId, data } = action.payload;
      return {
        ...state,
        channel: {
          ...state.channel,
          [channelId]: {
            ...state.channel[channelId],
            data
          }
        }
      };
    }

    case SAVE_NEW_TRADE: {
      const { channelId, data } = action.payload;
      return {
        ...state,
        channel: {
          ...state.channel,
          [channelId]: {
            ...state.channel[channelId],
            data: [data, ...state.channel[channelId].data.slice(0, -1)]
          }
        }
      };
    }

    case UPDATE_TRADE: {
      const { channelId, data } = action.payload;
      const [id] = data;
      return {
        ...state,
        channel: {
          ...state.channel,
          [channelId]: {
            ...state.channel[channelId],
            data: state.channel[channelId].data.map(trade =>
              trade[0] === id ? data : trade
            )
          }
        }
      };
    }

    default:
      return state;
  }
}

export const setChannel = payload => ({ type: SET_CHANNEL, payload });

export const saveTicker = payload => ({ type: SAVE_TICKER, payload });

export const saveTrades = payload => ({ type: SAVE_TRADES, payload });

export const saveNewTrade = payload => ({ type: SAVE_NEW_TRADE, payload });

export const updateTrade = payload => ({ type: UPDATE_TRADE, payload });
