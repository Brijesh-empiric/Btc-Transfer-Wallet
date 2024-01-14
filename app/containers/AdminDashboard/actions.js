import * as types from './constants';
import action from 'utils/action';

export const fetchAllAdminNotificationRequestAction = action(
  types.FETCH_ALL_ADMIN_NOTIFICATION_REQUEST,
  'queryParams',
);
export const fetchAllAdminNotificationSuccessAction = action(
  types.FETCH_ALL_ADMIN_NOTIFICATION_SUCCESS,
  'successResponse',
);
export const fetchAllAdminNotificationFailureAction = action(
  types.FETCH_ALL_ADMIN_NOTIFICATION_FAILURE,
  'errorResponse',
);

export const seeMoreAdminNotificationRequestAction = action(
  types.SEE_MORE_ADMIN_NOTIFICATION_REQUEST,
  'queryParams',
);

export const seenAdminNotificationRequestAction = action(
  types.SEEN_ADMIN_NOTIFICATION_REQUEST,
  'reqObj',
);
export const seenAdminNotificationSuccessAction = action(
  types.SEEN_ADMIN_NOTIFICATION_SUCCESS,
  'successResponse',
);
export const seenAdminNotificationFailureAction = action(
  types.SEEN_ADMIN_NOTIFICATION_FAILURE,
  'errorResponse',
);

export const deleteAdminNotificationRequestAction = action(
  types.DELETE_ADMIN_NOTIFICATION_REQUEST,
  'reqObj',
);
export const deleteAdminNotificationSuccessAction = action(
  types.DELETE_ADMIN_NOTIFICATION_SUCCESS,
  'successResponse',
);
export const deleteAdminNotificationFailureAction = action(
  types.DELETE_ADMIN_NOTIFICATION_FAILURE,
  'errorResponse',
);

export const decreaseNotificationCountRequestAction = action(
  types.DECREASE_NOTIFICATION_COUNT_REQUEST,
);
