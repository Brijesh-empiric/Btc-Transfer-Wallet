import { createSelector } from 'reselect';

const selectVerifyAdminEmailTokenDomain = state =>
  state.get('verifyAdminEmailToken');

const makeSelectVerifyAdminEmailTokenRequesting = () =>
  createSelector(selectVerifyAdminEmailTokenDomain, state =>
    state.get('verifyAdminEmailTokenRequesting'),
  );
const makeSelectVerifyAdminEmailTokenSuccess = () =>
  createSelector(selectVerifyAdminEmailTokenDomain, state =>
    state.get('verifyAdminEmailTokenSuccess'),
  );
const makeSelectVerifyAdminEmailTokenFailure = () =>
  createSelector(selectVerifyAdminEmailTokenDomain, state =>
    state.get('verifyAdminEmailTokenFailure'),
  );
const makeSelectVerifyAdminEmailTokenFailureMsg = () =>
  createSelector(selectVerifyAdminEmailTokenDomain, state =>
    state.get('verifyAdminEmailTokenFailureMsg'),
  );
const makeSelectVerifyAdminEmailTokenSuccessMsg = () =>
  createSelector(selectVerifyAdminEmailTokenDomain, state =>
    state.get('verifyAdminEmailTokenSuccessMsg'),
  );

export {
  makeSelectVerifyAdminEmailTokenRequesting,
  makeSelectVerifyAdminEmailTokenSuccess,
  makeSelectVerifyAdminEmailTokenFailure,
  makeSelectVerifyAdminEmailTokenSuccessMsg,
  makeSelectVerifyAdminEmailTokenFailureMsg,
};
