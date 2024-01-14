import { createSelector } from 'reselect';

const selectUserDashboard = state => state.get('userDashboard');

const makeSelectSuccess = () =>
  createSelector(selectUserDashboard, state => state.get('success'));
const makeSelectResponse = () =>
  createSelector(selectUserDashboard, state => state.get('response'));
const makeSelectError = () =>
  createSelector(selectUserDashboard, state => state.get('error'));
const makeSelectRequesting = () =>
  createSelector(selectUserDashboard, state => state.get('requesting'));
const makeSelectStatus = () =>
  createSelector(selectUserDashboard, state => state.get('status'));
const makeSelectCartTotal = () =>
  createSelector(selectUserDashboard, state => state.get('cartTotal'));

const makeSelectFetchAllUserNotificationRequesting = () =>
  createSelector(selectUserDashboard, state =>
    state.get('fetchAllUserNotificationRequesting'),
  );

const makeSelectFetchAllUserNotificationResponse = () =>
  createSelector(selectUserDashboard, state =>
    state.get('fetchAllUserNotificationResponse'),
  );

const makeSelectFetchAllUserNotificationSuccess = () =>
  createSelector(selectUserDashboard, state =>
    state.get('fetchAllUserNotificationSuccess'),
  );

const makeSelectFetchAllUserNotificationSuccessMsg = () =>
  createSelector(selectUserDashboard, state =>
    state.get('fetchAllUserNotificationSuccessMsg'),
  );

const makeSelectFetchAllUserNotificationFailureMsg = () =>
  createSelector(selectUserDashboard, state =>
    state.get('fetchAllUserNotificationFailureMsg'),
  );

const makeSelectFetchAllUserNotificationFailure = () =>
  createSelector(selectUserDashboard, state =>
    state.get('fetchAllUserNotificationFailure'),
  );

const makeSelectSeeMoreUserNotificationRequesting = () =>
  createSelector(selectUserDashboard, state =>
    state.get('seeMoreUserNotificationRequesting'),
  );

const makeSelectAllUserNotificationCount = () =>
  createSelector(selectUserDashboard, state =>
    state.get('allUserNotificationCount'),
  );

const makeSelectUnreadUserNotificationCount = () =>
  createSelector(selectUserDashboard, state =>
    state.get('unreadUserNotificationCount'),
  );
export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectStatus,
  makeSelectCartTotal,
  makeSelectFetchAllUserNotificationResponse,
  makeSelectFetchAllUserNotificationSuccess,
  makeSelectFetchAllUserNotificationFailure,
  makeSelectFetchAllUserNotificationSuccessMsg,
  makeSelectFetchAllUserNotificationFailureMsg,
  makeSelectFetchAllUserNotificationRequesting,
  makeSelectSeeMoreUserNotificationRequesting,
  makeSelectAllUserNotificationCount,
  makeSelectUnreadUserNotificationCount,
};
