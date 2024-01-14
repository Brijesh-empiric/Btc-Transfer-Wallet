import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCustomerModuleDomain = state =>
  state.customerModule || initialState;

const makeSelectGetAllCustomerListSuccess = () =>
  createSelector(
    selectCustomerModuleDomain,
    state => state.getAllCustomerListSuccess,
  );
const makeSelectGetAllCustomerListFailure = () =>
  createSelector(
    selectCustomerModuleDomain,
    state => state.getAllCustomerListFailure,
  );
const makeSelectGetAllCustomerListRequesting = () =>
  createSelector(
    selectCustomerModuleDomain,
    state => state.getAllCustomerListRequesting,
  );
const makeSelectGetAllCustomerListSuccessMsg = () =>
  createSelector(
    selectCustomerModuleDomain,
    state => state.getAllCustomerListSuccessMsg,
  );
const makeSelectGetAllCustomerListFailureMsg = () =>
  createSelector(
    selectCustomerModuleDomain,
    state => state.getAllCustomerListFailureMsg,
  );
const makeSelectGetAllCustomerListResponse = () =>
  createSelector(
    selectCustomerModuleDomain,
    state => state.getAllCustomerListResponse,
  );

export {
  makeSelectGetAllCustomerListSuccess,
  makeSelectGetAllCustomerListFailure,
  makeSelectGetAllCustomerListResponse,
  makeSelectGetAllCustomerListRequesting,
  makeSelectGetAllCustomerListSuccessMsg,
  makeSelectGetAllCustomerListFailureMsg,
};
