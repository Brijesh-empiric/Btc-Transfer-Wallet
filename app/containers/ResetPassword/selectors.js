import { createSelector } from 'reselect';

const selectResetPasswordDomain = state => state.get('resetPassword');

const makeSelectResetPasswordRequest = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('resetPasswordRequest'),
  );

const makeSelectResetPasswordSuccess = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('resetPasswordSuccess'),
  );

const makeSelectResetPasswordFailure = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('resetPasswordFailure'),
  );

const makeSelectResetPasswordSuccessMsg = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('resetPasswordSuccessMsg'),
  );

const makeSelectResetPasswordFailureMsg = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('resetPasswordFailureMsg'),
  );

const makeSelectValidateTokenRequest = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('validateTokenRequest'),
  );

const makeSelectValidateTokenSuccess = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('validateTokenSuccess'),
  );

const makeSelectValidateTokenFailure = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('validateTokenFailure'),
  );

const makeSelectValidateTokenSuccessMsg = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('validateTokenSuccessMsg'),
  );

const makeSelectValidateTokenFailureMsg = () =>
  createSelector(selectResetPasswordDomain, state =>
    state.get('validateTokenFailureMsg'),
  );

export {
  makeSelectResetPasswordRequest,
  makeSelectResetPasswordSuccess,
  makeSelectResetPasswordFailure,
  makeSelectResetPasswordSuccessMsg,
  makeSelectResetPasswordFailureMsg,
  makeSelectValidateTokenRequest,
  makeSelectValidateTokenSuccess,
  makeSelectValidateTokenFailure,
  makeSelectValidateTokenSuccessMsg,
  makeSelectValidateTokenFailureMsg,
};
