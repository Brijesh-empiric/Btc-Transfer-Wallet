import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the btcConverter state domain
 */

const selectBtcConverterDomain = state =>
  state.get('btcConverter', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BtcConverter
 */

const makeSelectBtcConverter = () =>
  createSelector(selectBtcConverterDomain, substate => substate.toJS());

export default makeSelectBtcConverter;
export { selectBtcConverterDomain };
