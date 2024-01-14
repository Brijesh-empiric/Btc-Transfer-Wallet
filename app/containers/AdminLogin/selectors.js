import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminLoginDomain = state => state.get('adminLogin', initialState);

const makeSelectAdminLoginRequest = () =>
  createSelector(selectAdminLoginDomain, state =>
    state.get('adminLoginRequest'),
  );
const makeSelectAdminLoginSuccess = () =>
  createSelector(selectAdminLoginDomain, state =>
    state.get('adminLoginSuccess'),
  );

const makeSelectAdminLoginError = () =>
  createSelector(selectAdminLoginDomain, state => state.get('adminLoginError'));
const makeSelectAdminLoginSuccessResponse = () =>
  createSelector(selectAdminLoginDomain, state =>
    state.get('adminLoginSuccessResponse'),
  );
const makeSelectAdminLoginErrorResponse = () =>
  createSelector(selectAdminLoginDomain, state =>
    state.get('adminLoginErrorResponse'),
  );
const makeSelectUserId = () =>
  createSelector(selectAdminLoginDomain, state => state.get('userId'));
const makeSelectEmail = () =>
  createSelector(selectAdminLoginDomain, state => state.get('email'));
const makeSelectIsLoggedIn = () =>
  createSelector(selectAdminLoginDomain, state => state.get('isLoggedIn'));

export {
  makeSelectEmail,
  makeSelectUserId,
  makeSelectIsLoggedIn,
  makeSelectAdminLoginRequest,
  makeSelectAdminLoginSuccess,
  makeSelectAdminLoginError,
  makeSelectAdminLoginErrorResponse,
  makeSelectAdminLoginSuccessResponse,
};
