import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from '../Login/constants';

const initialState = fromJS({
  response: null,
  error: null,
  requesting: false,
  success: false,
  status: null,

  fetchAllUserNotificationResponse: [],
  fetchAllUserNotificationSuccess: false,
  fetchAllUserNotificationFailure: false,
  fetchAllUserNotificationSuccessMsg: '',
  fetchAllUserNotificationFailureMsg: '',
  fetchAllUserNotificationRequesting: false,
  allUserNotificationCount: 0,
  unreadUserNotificationCount: 0,
  seeMoreUserNotificationRequesting: false,

  seenUserNotificationSuccess: false,
  seenUserNotificationFailure: false,
  seenUserNotificationSuccessMsg: '',
  seenUserNotificationFailureMsg: '',
  seenUserNotificationRequesting: false,

  deleteUserNotificationSuccess: false,
  deleteUserNotificationFailure: false,
  deleteUserNotificationSuccessMsg: '',
  deleteUserNotificationFailureMsg: '',
  deleteUserNotificationRequesting: false,
});

function userDashboardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESEND_CONFIRMATION_REQUEST:
      return state.merge({
        requesting: true,
        error: null,
        response: null,
        success: false,
      });

    case types.RESEND_CONFIRMATION_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.message,
        error: null,
        success: true,
      });

    case types.RESEND_CONFIRMATION_FAILURE:
      return state.merge({
        requesting: false,
        response: null,
        error: action.error.message,
        success: false,
      });

    case types.FETCH_ALL_USER_NOTIFICATION_REQUEST:
      return state.merge({
        allUserNotificationCount: 0,
        unreadUserNotificationCount: 0,
        fetchAllUserNotificationResponse: [],
        fetchAllUserNotificationSuccess: false,
        fetchAllUserNotificationFailure: false,
        fetchAllUserNotificationSuccessMsg: '',
        fetchAllUserNotificationFailureMsg: '',
        fetchAllUserNotificationRequesting: true,
      });

    case types.FETCH_ALL_USER_NOTIFICATION_SUCCESS:
      return state.merge({
        fetchAllUserNotificationSuccess: true,
        fetchAllUserNotificationSuccessMsg: '',
        fetchAllUserNotificationRequesting: false,
        fetchAllUserNotificationResponse: [
          ...state.toJS().fetchAllUserNotificationResponse,
          ...action.successResponse.notifications,
        ],
        seeMoreUserNotificationRequesting: false,
        allUserNotificationCount:
          action.successResponse.pagination_data &&
          action.successResponse.pagination_data.total_count
            ? action.successResponse.pagination_data.total_count
            : 0,
        unreadUserNotificationCount: action.successResponse
          .unread_notifications_count
          ? action.successResponse.unread_notifications_count
          : 0,
      });

    case types.FETCH_ALL_USER_NOTIFICATION_FAILURE:
      return state.merge({
        fetchAllUserNotificationFailure: true,
        fetchAllUserNotificationFailureMsg: '',
        fetchAllUserNotificationRequesting: false,
        seeMoreUserNotificationRequesting: false,
      });

    case types.SEE_MORE_USER_NOTIFICATION_REQUEST:
      return state.merge({
        seeMoreUserNotificationRequesting: true,
      });

    case types.SEEN_USER_NOTIFICATION_REQUEST:
      return state.merge({
        seenUserNotificationSuccess: false,
        seenUserNotificationFailure: false,
        seenUserNotificationSuccessMsg: '',
        seenUserNotificationFailureMsg: '',
        seenUserNotificationRequesting: true,
      });
    case types.SEEN_USER_NOTIFICATION_SUCCESS:
      return state.merge({
        seenUserNotificationSuccess: true,
        seenUserNotificationSuccessMsg: '',
        seenUserNotificationRequesting: false,
      });
    case types.SEEN_USER_NOTIFICATION_FAILURE:
      return state.merge({
        seenUserNotificationFailure: false,
        seenUserNotificationFailureMsg: '',
        seenUserNotificationRequesting: false,
      });

    case types.DELETE_USER_NOTIFICATION_REQUEST:
      return state.merge({
        deleteUserNotificationSuccess: false,
        deleteUserNotificationFailure: false,
        deleteUserNotificationSuccessMsg: '',
        deleteUserNotificationFailureMsg: '',
        deleteUserNotificationRequesting: true,
        fetchAllUserNotificationResponse: state
          .toJS()
          .fetchAllUserNotificationResponse.filter(
            data => data.id !== action.reqObj.notificationId,
          ),
        allUserNotificationCount: state.toJS().allUserNotificationCount - 1,
      });

    case types.DELETE_USER_NOTIFICATION_SUCCESS:
      return state.merge({
        deleteUserNotificationSuccess: true,
        deleteUserNotificationSuccessMsg: '',
        deleteUserNotificationRequesting: false,
      });
    case types.DELETE_USER_NOTIFICATION_FAILURE:
      return state.merge({
        deleteUserNotificationFailure: true,
        deleteUserNotificationFailureMsg: '',
        deleteUserNotificationRequesting: false,
      });
    case types.DECREASE_USER_NOTIFICATION_COUNT_REQUEST:
      return state.merge({
        unreadUserNotificationCount:
          state.toJS().unreadUserNotificationCount - 1,
      });
    case LOGOUT_SUCCESS:
    case types.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}

export default userDashboardReducer;
