import { createSelector } from 'reselect';

const selectCustomerQueriesDomain = state => state.get('customerQueries');

const makeSelectCustomerQueriesRequesting = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('getAllCustomerQueriesRequesting'),
  );

const makeSelectCustomerQueriesSuccess = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('getAllCustomerQueriesSuccess'),
  );

const makeSelectCustomerQueriesFailure = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('getAllCustomerQueriesFailure'),
  );

const makeSelectCustomerQueriesSuccessMsg = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('getAllCustomerQueriesSuccessMsg'),
  );

const makeSelectCustomerQueriesFailureMsg = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('getAllCustomerQueriesFailureMsg'),
  );

const makeSelectCustomerQueriesResponse = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('getAllCustomerQueriesResponse'),
  );

const makeSelectUpdateResolveStatusRequesting = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('updateResolveStatusRequesting'),
  );

const makeSelectUpdateResolveStatusSuccess = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('updateResolveStatusSuccess'),
  );

const makeSelectUpdateResolveStatusSuccessMsg = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('updateResolveStatusSuccessMsg'),
  );

const makeSelectUpdateResolveStatusFailureMsg = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('updateResolveStatusFailureMsg'),
  );

const makeSelectUpdateResolveStatusFailure = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('updateResolveStatusFailure'),
  );

const makeSelectDeleteCustomerQueryRequesting = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('deleteCustomerQueryRequesting'),
  );

const makeSelectDeleteCustomerQuerySuccess = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('deleteCustomerQuerySuccess'),
  );

const makeSelectDeleteCustomerQuerySuccessMsg = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('deleteCustomerQuerySuccessMsg'),
  );

const makeSelectDeleteCustomerQueryFailure = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('deleteCustomerQueryFailure'),
  );

const makeSelectDeleteCustomerQueryFailureMsg = () =>
  createSelector(selectCustomerQueriesDomain, state =>
    state.get('deleteCustomerQueryFailureMsg'),
  );

export {
  makeSelectCustomerQueriesSuccess,
  makeSelectCustomerQueriesFailure,
  makeSelectCustomerQueriesResponse,
  makeSelectCustomerQueriesSuccessMsg,
  makeSelectCustomerQueriesFailureMsg,
  makeSelectCustomerQueriesRequesting,
  makeSelectUpdateResolveStatusSuccess,
  makeSelectUpdateResolveStatusFailure,
  makeSelectUpdateResolveStatusSuccessMsg,
  makeSelectUpdateResolveStatusFailureMsg,
  makeSelectUpdateResolveStatusRequesting,
  makeSelectDeleteCustomerQuerySuccess,
  makeSelectDeleteCustomerQueryFailure,
  makeSelectDeleteCustomerQuerySuccessMsg,
  makeSelectDeleteCustomerQueryFailureMsg,
  makeSelectDeleteCustomerQueryRequesting,
};
