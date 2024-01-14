/*
 *
 * MarketCap actions
 *
 */

import action from 'utils/action';
import * as types from './constants';

export const fetchMarketCapRequestAction = action(
  types.FETCH_MARKET_CAP_REQUEST,
  'queryParams',
);

export const fetchMarketCapSuccessAction = action(
  types.FETCH_MARKET_CAP_SUCCESS,
  'successResponse',
);

export const fetchMarketCapFailureAction = action(
  types.FETCH_MARKET_CAP_FAILURE,
  'errorResponse',
);
