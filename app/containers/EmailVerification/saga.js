import { fork, takeLatest } from 'redux-saga/effects';

import API from 'utils/apiHelper';
import * as types from './constants';
import {
  resendUserEmailVerificationSuccessAction,
  resendUserEmailVerificationFailureAction,
} from './actions';

function* resendUserEmailVerificationGenerator(action) {
  const { reqObj } = action;
  yield fork(
    API.post(
      `resend_email/`,
      resendUserEmailVerificationSuccessAction,
      resendUserEmailVerificationFailureAction,
      {
        email: reqObj.email,
        event_name: 'account_verification',
      },
      '',
      '',
    ),
  );
}

// Individual exports for testing
export default function* emailVerificationSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    types.RESEND_USER_EMAIL_VERIFICATION_REQUEST,
    resendUserEmailVerificationGenerator,
  );
}
