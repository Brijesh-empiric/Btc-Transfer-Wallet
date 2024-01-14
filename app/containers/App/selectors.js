import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');
const selectRouter = state => state.get('router');
const selectLogin = state => state.get('login');
const selectAdminLogin = state => state.get('adminLogin');

const makeSelectError = () =>
  createSelector(selectGlobal, state => state.get('error'));
const makeSelectUserId = () =>
  createSelector(makeSelectUser(), state => state.get('user_id'));
const makeSelectDialog = () =>
  createSelector(selectGlobal, state => state.get('dialog'));
const makeSelectMessage = () =>
  createSelector(selectGlobal, state => state.get('message'));
const makeSelectLoading = () =>
  createSelector(selectGlobal, state => state.get('loading'));
const makeSelectUserInfo = () =>
  createSelector(selectGlobal, state => state.get('user'));

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );
const makeSelectUser = () =>
  createSelector(selectLogin, state => state.get('userInfo'));
const makeSelectAdminUser = () =>
  createSelector(selectAdminLogin, state => state.get('userInfo'));

const makeSelectBtcPriceList = () =>
  createSelector(selectGlobal, state => state.get('btcPriceList'));

export {
  makeSelectLocation,
  makeSelectUser,
  makeSelectDialog,
  makeSelectError,
  makeSelectLoading,
  makeSelectUserId,
  makeSelectMessage,
  makeSelectUserInfo,
  makeSelectAdminUser,
  makeSelectBtcPriceList,
};
