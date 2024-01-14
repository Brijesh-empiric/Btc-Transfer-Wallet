import { createSelector } from 'reselect';

const selectAdminModuleDomain = state => state.get('adminModule');

const makeSelectCreateAdminSuccess = () =>
  createSelector(selectAdminModuleDomain, state =>
    state.get('createAdminSuccess'),
  );
const makeSelectCreateAdminFailure = () =>
  createSelector(selectAdminModuleDomain, state =>
    state.get('createAdminFailure'),
  );
const makeSelectCreateAdminRequesting = () =>
  createSelector(selectAdminModuleDomain, state =>
    state.get('createAdminRequesting'),
  );
const makeSelectCreateAdminSuccessMsg = () =>
  createSelector(selectAdminModuleDomain, state =>
    state.get('createAdminSuccessMsg'),
  );
const makeSelectCreateAdminFailureMsg = () =>
  createSelector(selectAdminModuleDomain, state =>
    state.get('createAdminFailureMsg'),
  );

export {
  makeSelectCreateAdminSuccess,
  makeSelectCreateAdminFailure,
  makeSelectCreateAdminRequesting,
  makeSelectCreateAdminSuccessMsg,
  makeSelectCreateAdminFailureMsg,
};
