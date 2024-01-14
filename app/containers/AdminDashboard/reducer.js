import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from '../Login/constants';

const initialState = fromJS({
  fetchAllAdminNotificationResponse: [],
  fetchAllAdminNotificationSuccess: false,
  fetchAllAdminNotificationFailure: false,
  fetchAllAdminNotificationSuccessMsg: '',
  fetchAllAdminNotificationFailureMsg: '',
  fetchAllAdminNotificationRequesting: false,
  allAdminNotificationCount: 0,
  unreadAdminNotificationCount: 0,
  seeMoreAdminNotificationRequesting: false,

  seenAdminNotificationSuccess: false,
  seenAdminNotificationFailure: false,
  seenAdminNotificationSuccessMsg: '',
  seenAdminNotificationFailureMsg: '',
  seenAdminNotificationRequesting: false,

  deleteAdminNotificationSuccess: false,
  deleteAdminNotificationFailure: false,
  deleteAdminNotificationSuccessMsg: '',
  deleteAdminNotificationFailureMsg: '',
  deleteAdminNotificationRequesting: false,
});

function adminDashboardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_ALL_ADMIN_NOTIFICATION_REQUEST:
      console.log('Addmin Fetch Notification: REducer');
      return state.merge({
        allAdminNotificationCount: 0,
        unreadAdminNotificationCount: 0,
        fetchAllAdminNotificationResponse: [],
        fetchAllAdminNotificationSuccess: false,
        fetchAllAdminNotificationFailure: false,
        fetchAllAdminNotificationSuccessMsg: '',
        fetchAllAdminNotificationFailureMsg: '',
        fetchAllAdminNotificationRequesting: true,
      });

    case types.FETCH_ALL_ADMIN_NOTIFICATION_SUCCESS:
      return state.merge({
        fetchAllAdminNotificationSuccess: true,
        fetchAllAdminNotificationSuccessMsg: '',
        fetchAllAdminNotificationRequesting: false,
        fetchAllAdminNotificationResponse: [
          ...state.toJS().fetchAllAdminNotificationResponse,
          ...action.successResponse.notifications,
        ],
        seeMoreAdminNotificationRequesting: false,
        allAdminNotificationCount:
          action.successResponse.pagination_data &&
          action.successResponse.pagination_data.total_count
            ? action.successResponse.pagination_data.total_count
            : 0,
        unreadAdminNotificationCount: action.successResponse
          .unread_notifications_count
          ? action.successResponse.unread_notifications_count
          : 0,
      });

    case types.FETCH_ALL_ADMIN_NOTIFICATION_FAILURE:
      return state.merge({
        fetchAllAdminNotificationFailure: true,
        fetchAllAdminNotificationFailureMsg: '',
        fetchAllAdminNotificationRequesting: false,
        seeMoreAdminNotificationRequesting: false,
      });

    case types.SEE_MORE_ADMIN_NOTIFICATION_REQUEST:
      return state.merge({
        seeMoreAdminNotificationRequesting: true,
      });

    case types.SEEN_ADMIN_NOTIFICATION_REQUEST:
      return state.merge({
        seenAdminNotificationSuccess: false,
        seenAdminNotificationFailure: false,
        seenAdminNotificationSuccessMsg: '',
        seenAdminNotificationFailureMsg: '',
        seenAdminNotificationRequesting: true,
      });
    case types.SEEN_ADMIN_NOTIFICATION_SUCCESS:
      return state.merge({
        seenAdminNotificationSuccess: true,
        seenAdminNotificationSuccessMsg: '',
        seenAdminNotificationRequesting: false,
      });
    case types.SEEN_ADMIN_NOTIFICATION_FAILURE:
      return state.merge({
        seenAdminNotificationFailure: false,
        seenAdminNotificationFailureMsg: '',
        seenAdminNotificationRequesting: false,
      });

    case types.DECREASE_NOTIFICATION_COUNT_REQUEST:
      return state.merge({
        unreadAdminNotificationCount:
          state.toJS().unreadAdminNotificationCount - 1,
      });

    case types.DELETE_ADMIN_NOTIFICATION_REQUEST:
      return state.merge({
        deleteAdminNotificationSuccess: false,
        deleteAdminNotificationFailure: false,
        deleteAdminNotificationSuccessMsg: '',
        deleteAdminNotificationFailureMsg: '',
        deleteAdminNotificationRequesting: true,
        fetchAllAdminNotificationResponse: state
          .toJS()
          .fetchAllAdminNotificationResponse.filter(
            data => data.id !== action.reqObj.notificationId,
          ),
        allAdminNotificationCount: state.toJS().allAdminNotificationCount - 1,
      });

    case types.DELETE_ADMIN_NOTIFICATION_SUCCESS:
      return state.merge({
        deleteAdminNotificationSuccess: true,
        deleteAdminNotificationSuccessMsg: '',
        deleteAdminNotificationRequesting: false,
      });
    case types.DELETE_ADMIN_NOTIFICATION_FAILURE:
      return state.merge({
        deleteAdminNotificationFailure: true,
        deleteAdminNotificationFailureMsg: '',
        deleteAdminNotificationRequesting: false,
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default adminDashboardReducer;
