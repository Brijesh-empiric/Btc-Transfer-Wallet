import { createSelector } from 'reselect';

const selectEmailVerificationDomain = state => state.get('emailVerification');

const makeSelectResendUserEmailVerificationRequesting = () =>
  createSelector(selectEmailVerificationDomain, state =>
    state.get('resendUserEmailVerificationRequesting'),
  );
const makeSelectResendUserEmailVerificationSuccess = () =>
  createSelector(selectEmailVerificationDomain, state =>
    state.get('resendUserEmailVerificationSuccess'),
  );
const makeSelectResendUserEmailVerificationFailure = () =>
  createSelector(selectEmailVerificationDomain, state =>
    state.get('resendUserEmailVerificationFailure'),
  );
const makeSelectResendUserEmailVerificationSuccessMsg = () =>
  createSelector(selectEmailVerificationDomain, state =>
    state.get('resendUserEmailVerificationSuccessMsg'),
  );
const makeSelectResendUserEmailVerificationFailureMsg = () =>
  createSelector(selectEmailVerificationDomain, state =>
    state.get('resendUserEmailVerificationFailureMsg'),
  );

export {
  makeSelectResendUserEmailVerificationSuccess,
  makeSelectResendUserEmailVerificationFailure,
  makeSelectResendUserEmailVerificationSuccessMsg,
  makeSelectResendUserEmailVerificationFailureMsg,
  makeSelectResendUserEmailVerificationRequesting,
};
