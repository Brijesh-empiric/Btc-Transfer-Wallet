import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the termsAndConditions state domain
 */

const selectTermsAndConditionsDomain = state =>
  state.get('termsAndConditions', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TermsAndConditions
 */

const makeSelectTermsAndConditions = () =>
  createSelector(selectTermsAndConditionsDomain, substate => substate.toJS());

export default makeSelectTermsAndConditions;
export { selectTermsAndConditionsDomain };
