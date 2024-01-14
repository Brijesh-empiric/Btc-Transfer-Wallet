import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the whereToBuy state domain
 */

const selectWhereToBuyDomain = state => state.get('whereToBuy', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by WhereToBuy
 */

const makeSelectWhereToBuy = () =>
  createSelector(selectWhereToBuyDomain, substate => substate.toJS());

export default makeSelectWhereToBuy;
export { selectWhereToBuyDomain };
