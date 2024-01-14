/*
 *
 * BtcPrice reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  error: null,
  requesting: false,
  success: false,
  btcPriceList: {
    dataList: [],
    currentPage: 1,
    totalItems: 0,
  },
});

function btcPriceReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_BTC_PRICE_REQUEST:
      return state.merge({
        btcPriceList: {
          dataList: [],
          currentPage: 1,
          totalItems: 0,
        },
        error: '',
        success: false,
        requesting: true,
      });
    case types.GET_BTC_PRICE_SUCCESS:
      return state.merge({
        btcPriceList: {
          dataList: action.response.data,
          currentPage: action.response.pagination.currentPage,
          totalItems: action.response.pagination.totalItems,
        },
        error: '',
        success: true,
        requesting: false,
      });
    case types.GET_BTC_PRICE_FAILURE:
      return state.merge({
        error: '',
        success: false,
        requesting: true,
      });
    default:
      return state;
  }
}

export default btcPriceReducer;
