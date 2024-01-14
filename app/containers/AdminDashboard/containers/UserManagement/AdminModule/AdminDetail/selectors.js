import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminDetail state domain
 */

const selectAdminDetailDomain = state => state.get('adminDetail', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminDetail
 */

const makeSelectAdminDetail = () =>
  createSelector(selectAdminDetailDomain, substate => substate.toJS());

export default makeSelectAdminDetail;
export { selectAdminDetailDomain };
