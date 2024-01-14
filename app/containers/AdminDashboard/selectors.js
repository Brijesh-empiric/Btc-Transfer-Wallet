import { createSelector } from 'reselect';

const selectAdminDashboard = state => state.get('adminDashboard');

const makeSelectFetchAllAdminNotificationRequesting = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('fetchAllAdminNotificationRequesting'),
  );

const makeSelectFetchAllAdminNotificationResponse = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('fetchAllAdminNotificationResponse'),
  );

const makeSelectFetchAllAdminNotificationSuccess = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('fetchAllAdminNotificationSuccess'),
  );

const makeSelectFetchAllAdminNotificationSuccessMsg = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('fetchAllAdminNotificationSuccessMsg'),
  );

const makeSelectFetchAllAdminNotificationFailureMsg = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('fetchAllAdminNotificationFailureMsg'),
  );

const makeSelectFetchAllAdminNotificationFailure = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('fetchAllAdminNotificationFailure'),
  );

const makeSelectSeeMoreAdminNotificationRequesting = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('seeMoreAdminNotificationRequesting'),
  );

const makeSelectAllAdminNotificationCount = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('allAdminNotificationCount'),
  );

const makeSelectUnreadAdminNotificationCount = () =>
  createSelector(selectAdminDashboard, state =>
    state.get('unreadAdminNotificationCount'),
  );
export {
  makeSelectFetchAllAdminNotificationResponse,
  makeSelectFetchAllAdminNotificationSuccess,
  makeSelectFetchAllAdminNotificationFailure,
  makeSelectFetchAllAdminNotificationSuccessMsg,
  makeSelectFetchAllAdminNotificationFailureMsg,
  makeSelectFetchAllAdminNotificationRequesting,
  makeSelectSeeMoreAdminNotificationRequesting,
  makeSelectAllAdminNotificationCount,
  makeSelectUnreadAdminNotificationCount,
};
