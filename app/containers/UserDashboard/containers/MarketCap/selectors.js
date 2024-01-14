import { createSelector } from 'reselect';

/**
 * Direct selector to the marketCap state domain
 */

const selectMarketCapDomain = state => state.get('marketCap');

const makeSelectFetchMarketCapSuccess = () =>
  createSelector(selectMarketCapDomain, state =>
    state.get('fetchMarketCapSuccess'),
  );
const makeSelectFetchMarketCapFailure = () =>
  createSelector(selectMarketCapDomain, state =>
    state.get('fetchMarketCapFailure'),
  );
const makeSelectFetchMarketCapResponse = () =>
  createSelector(selectMarketCapDomain, state =>
    state.get('fetchMarketCapResponse'),
  );
const makeSelectFetchMarketCapRequesting = () =>
  createSelector(selectMarketCapDomain, state =>
    state.get('fetchMarketCapRequesting'),
  );
const makeSelectFetchMarketCapSuccessMsg = () =>
  createSelector(selectMarketCapDomain, state =>
    state.get('fetchMarketCapSuccessMsg'),
  );
const makeSelectFetchMarketCapFailureMsg = () =>
  createSelector(selectMarketCapDomain, state =>
    state.get('fetchMarketCapFailureMsg'),
  );

export {
  makeSelectFetchMarketCapSuccess,
  makeSelectFetchMarketCapFailure,
  makeSelectFetchMarketCapResponse,
  makeSelectFetchMarketCapRequesting,
  makeSelectFetchMarketCapSuccessMsg,
  makeSelectFetchMarketCapFailureMsg,
};
