/*
 *
 * BtcPrice actions
 *
 */

import action from 'utils/action';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const getBtcPriceRequest = action(
  types.GET_BTC_PRICE_REQUEST,
  'payload',
);
export const getBtcPriceSuccess = action(
  types.GET_BTC_PRICE_SUCCESS,
  'response',
);
export const getBtcPriceFailure = action(types.GET_BTC_PRICE_FAILURE, 'error');

export const clearState = action(types.CLEAR_STATE);
