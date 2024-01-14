import { createSelector } from 'reselect';

const selectForgetPasswordDomain = state => state.get('forgetPassword');

const makeSelectForgetPasswordRequest = () =>
  createSelector(selectForgetPasswordDomain, state =>
    state.get('forgetPasswordRequest'),
  );
const makeSelectForgetPasswordSuccess = () =>
  createSelector(selectForgetPasswordDomain, state =>
    state.get('forgetPasswordSuccess'),
  );
const makeSelectForgetPasswordFailure = () =>
  createSelector(selectForgetPasswordDomain, state =>
    state.get('forgetPasswordFailure'),
  );
const makeSelectForgetPasswordSuccessMsg = () =>
  createSelector(selectForgetPasswordDomain, state =>
    state.get('forgetPasswordSuccessMsg'),
  );
const makeSelectForgetPasswordFailureMsg = () =>
  createSelector(selectForgetPasswordDomain, state =>
    state.get('forgetPasswordFailureMsg'),
  );

export {
  makeSelectForgetPasswordRequest,
  makeSelectForgetPasswordSuccess,
  makeSelectForgetPasswordFailure,
  makeSelectForgetPasswordSuccessMsg,
  makeSelectForgetPasswordFailureMsg,
};
