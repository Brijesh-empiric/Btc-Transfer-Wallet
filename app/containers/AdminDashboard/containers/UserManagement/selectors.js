import { createSelector } from 'reselect';

const selectUserManagementDomain = state => state.get('userManagement');

const makeSelectGetAllCustomerListSuccess = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('getAllCustomerListSuccess'),
  );
const makeSelectGetAllCustomerListFailure = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('getAllCustomerListFailure'),
  );
const makeSelectGetAllCustomerListRequesting = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('getAllCustomerListRequesting'),
  );
const makeSelectGetAllCustomerListSuccessMsg = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('getAllCustomerListSuccessMsg'),
  );
const makeSelectGetAllCustomerListFailureMsg = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('getAllCustomerListFailureMsg'),
  );
const makeSelectGetAllCustomerListResponse = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('getAllCustomerListResponse'),
  );

const makeSelectDeleteAdminSuccess = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteAdminSuccess'),
  );
const makeSelectDeleteAdminFailure = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteAdminFailure'),
  );
const makeSelectDeleteAdminRequesting = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteAdminRequesting'),
  );
const makeSelectDeleteAdminSuccessMsg = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteAdminSuccessMsg'),
  );
const makeSelectDeleteAdminFailureMsg = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteAdminFailureMsg'),
  );

const makeSelectDeleteCustomerSuccess = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteCustomerSuccess'),
  );
const makeSelectDeleteCustomerFailure = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteCustomerFailure'),
  );
const makeSelectDeleteCustomerRequesting = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteCustomerRequesting'),
  );
const makeSelectDeleteCustomerSuccessMsg = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteCustomerSuccessMsg'),
  );
const makeSelectDeleteCustomerFailureMsg = () =>
  createSelector(selectUserManagementDomain, state =>
    state.get('deleteCustomerFailureMsg'),
  );

export {
  makeSelectGetAllCustomerListSuccess,
  makeSelectGetAllCustomerListFailure,
  makeSelectGetAllCustomerListResponse,
  makeSelectGetAllCustomerListRequesting,
  makeSelectGetAllCustomerListSuccessMsg,
  makeSelectGetAllCustomerListFailureMsg,
  makeSelectDeleteAdminSuccess,
  makeSelectDeleteAdminFailure,
  makeSelectDeleteAdminRequesting,
  makeSelectDeleteAdminSuccessMsg,
  makeSelectDeleteAdminFailureMsg,
  makeSelectDeleteCustomerSuccess,
  makeSelectDeleteCustomerFailure,
  makeSelectDeleteCustomerRequesting,
  makeSelectDeleteCustomerSuccessMsg,
  makeSelectDeleteCustomerFailureMsg,
};
