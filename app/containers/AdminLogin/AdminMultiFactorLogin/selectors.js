import { createSelector } from 'reselect';

const selectAdminMultiFactorLoginDomain = state =>
  state.get('adminMultiFactorLogin');

const makeSelectError = () =>
  createSelector(selectAdminMultiFactorLoginDomain, state =>
    state.get('error'),
  );
const makeSelectRequesting = () =>
  createSelector(selectAdminMultiFactorLoginDomain, state =>
    state.get('requesting'),
  );

export { makeSelectError, makeSelectRequesting };
