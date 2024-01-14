import { createSelector } from 'reselect';

const selectUserContactPageDomain = state => state.get('contactPage');

const makeSelectPostCustomerQueriesRequesting = () =>
  createSelector(selectUserContactPageDomain, state =>
    state.get('postCustomerQueriesRequesting'),
  );

const makeSelectPostCustomerQueriesSuccess = () =>
  createSelector(selectUserContactPageDomain, state =>
    state.get('postCustomerQueriesSuccess'),
  );

const makeSelectPostCustomerQueriesSuccessMsg = () =>
  createSelector(selectUserContactPageDomain, state =>
    state.get('postCustomerQueriesSuccessMsg'),
  );

const makeSelectPostCustomerQueriesFailure = () =>
  createSelector(selectUserContactPageDomain, state =>
    state.get('postCustomerQueriesFailure'),
  );

const makeSelectPostCustomerQueriesFailureMsg = () =>
  createSelector(selectUserContactPageDomain, state =>
    state.get('postCustomerQueriesFailureMsg'),
  );

export {
  makeSelectPostCustomerQueriesSuccess,
  makeSelectPostCustomerQueriesFailure,
  makeSelectPostCustomerQueriesSuccessMsg,
  makeSelectPostCustomerQueriesFailureMsg,
  makeSelectPostCustomerQueriesRequesting,
};
