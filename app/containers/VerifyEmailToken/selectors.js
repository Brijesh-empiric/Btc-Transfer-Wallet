import { createSelector } from 'reselect';

const selectVerifyEmailTokenDomain = state => state.get('verifyEmailToken');

const makeSelectVerifyEmailTokenRequest = () =>
  createSelector(selectVerifyEmailTokenDomain, state =>
    state.get('verifyEmailTokenRequest'),
  );
const makeSelectVerifyEmailTokenSuccess = () =>
  createSelector(selectVerifyEmailTokenDomain, state =>
    state.get('verifyEmailTokenSuccess'),
  );
const makeSelectVerifyEmailTokenFailure = () =>
  createSelector(selectVerifyEmailTokenDomain, state =>
    state.get('verifyEmailTokenFailure'),
  );
const makeSelectVerifyEmailTokenFailureMsg = () =>
  createSelector(selectVerifyEmailTokenDomain, state =>
    state.get('verifyEmailTokenFailureMsg'),
  );
const makeSelectVerifyEmailTokenSuccessMsg = () =>
  createSelector(selectVerifyEmailTokenDomain, state =>
    state.get('verifyEmailTokenSuccessMsg'),
  );

export {
  makeSelectVerifyEmailTokenRequest,
  makeSelectVerifyEmailTokenSuccess,
  makeSelectVerifyEmailTokenFailure,
  makeSelectVerifyEmailTokenSuccessMsg,
  makeSelectVerifyEmailTokenFailureMsg,
};
