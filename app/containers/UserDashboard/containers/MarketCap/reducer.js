/*
 *
 * MarketCap reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  fetchMarketCapResponse: {},
  fetchMarketCapSuccess: false,
  fetchMarketCapFailure: false,
  fetchMarketCapSuccessMsg: '',
  fetchMarketCapFailureMsg: '',
  fetchMarketCapRequesting: false,
});

function marketCapReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MARKET_CAP_REQUEST:
      return state.merge({
        fetchMarketCapResponse: {},
        fetchMarketCapSuccess: false,
        fetchMarketCapFailure: false,
        fetchMarketCapSuccessMsg: '',
        fetchMarketCapFailureMsg: '',
        fetchMarketCapRequesting: true,
      });
    case types.FETCH_MARKET_CAP_SUCCESS:
      return state.merge({
        fetchMarketCapSuccess: true,
        fetchMarketCapSuccessMsg: '',
        fetchMarketCapRequesting: false,
        fetchMarketCapResponse: action.successResponse,
      });

    case types.FETCH_MARKET_CAP_FAILURE:
      return state.merge({
        fetchMarketCapFailure: true,
        fetchMarketCapRequesting: false,
        fetchMarketCapFailureMsg: 'Something went wrong. Please Try Later.',
      });
    default:
      return state;
  }
}

export default marketCapReducer;
