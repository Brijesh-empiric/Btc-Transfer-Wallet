import { take, fork, takeLatest } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import API from 'utils/apiHelper';
import * as types from './constants';
import {
  fetchMarketCapSuccessAction,
  fetchMarketCapFailureAction,
} from './actions';

function* fetchMarketCapGenerator(action) {
  const {
    queryParams: { currentpage, perpage },
  } = action;
  console.log('Oadf');
  yield fork(
    API.get(
      // `https://uat-users.coinstirs.com/api/customer/v1/wallet/get-coins-list?currentpage=${currentpage}&perpage=${perpage}&currency=usd&pricechangepercent`,
      `https://btctransferwallet.com/api/get-coins-list?currentpage=${currentpage}&perpage=20&currency=usd&pricechangepercent`,
      fetchMarketCapSuccessAction,
      fetchMarketCapFailureAction,
    ),
  );
  yield take([LOCATION_CHANGE, types.FETCH_MARKET_CAP_FAILURE]);
}
// Individual exports for testing
export default function* marketCapSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.FETCH_MARKET_CAP_REQUEST, fetchMarketCapGenerator);
}
