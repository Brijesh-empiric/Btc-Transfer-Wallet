import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the btcPrice state domain
 */

const selectBtcPriceDomain = state => state.get('btcPrice', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BtcPrice
 */

const makeSelectBtcPrice = () =>
  createSelector(selectBtcPriceDomain, substate => substate.toJS());

const makeSelectRequesting = () =>
  createSelector(selectBtcPriceDomain, state => state.get('requesting'));
const makeSelectError = () =>
  createSelector(selectBtcPriceDomain, state => state.get('error'));
const makeSelectBtcPriceList = () =>
  createSelector(selectBtcPriceDomain, state => state.get('btcPriceList'));

export default makeSelectBtcPrice;
export {
  makeSelectError,
  selectBtcPriceDomain,
  makeSelectRequesting,
  makeSelectBtcPriceList,
};
