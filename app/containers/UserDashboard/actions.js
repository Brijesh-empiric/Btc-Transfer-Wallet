import * as types from './constants';
import action from 'utils/action';

export const resendConfirmationRequest = action(
  types.RESEND_CONFIRMATION_REQUEST,
);
export const resendConfirmationSuccess = action(
  types.RESEND_CONFIRMATION_SUCCESS,
  'response',
);
export const resendConfirmationFailure = action(
  types.RESEND_CONFIRMATION_FAILURE,
  'error',
);

export const clearState = action(types.CLEAR_STATE);

export const fetchAllUserNotificationRequestAction = action(
  types.FETCH_ALL_USER_NOTIFICATION_REQUEST,
  'queryParams',
);
export const fetchAllUserNotificationSuccessAction = action(
  types.FETCH_ALL_USER_NOTIFICATION_SUCCESS,
  'successResponse',
);
export const fetchAllUserNotificationFailureAction = action(
  types.FETCH_ALL_USER_NOTIFICATION_FAILURE,
  'errorResponse',
);

export const seeMoreUserNotificationRequestAction = action(
  types.SEE_MORE_USER_NOTIFICATION_REQUEST,
  'queryParams',
);

export const seenUserNotificationRequestAction = action(
  types.SEEN_USER_NOTIFICATION_REQUEST,
  'reqObj',
);
export const seenUserNotificationSuccessAction = action(
  types.SEEN_USER_NOTIFICATION_SUCCESS,
  'successResponse',
);
export const seenUserNotificationFailureAction = action(
  types.SEEN_USER_NOTIFICATION_FAILURE,
  'errorResponse',
);

export const deleteUserNotificationRequestAction = action(
  types.DELETE_USER_NOTIFICATION_REQUEST,
  'reqObj',
);
export const deleteUserNotificationSuccessAction = action(
  types.DELETE_USER_NOTIFICATION_SUCCESS,
  'successResponse',
);
export const deleteUserNotificationFailureAction = action(
  types.DELETE_USER_NOTIFICATION_FAILURE,
  'errorResponse',
);

export const decreaseUserNotificationCountRequestAction = action(
  types.DECREASE_USER_NOTIFICATION_COUNT_REQUEST,
);
