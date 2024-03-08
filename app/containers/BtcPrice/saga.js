import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork } from 'redux-saga/effects';

import API from 'utils/apiHelper';
import * as types from './constants';
import { getBtcPriceSuccess, getBtcPriceFailure } from './actions';

function* getBtcPriceList(action) {
  const { currentpage, perpage } = action.payload;
  yield fork(
    API.get(
      `https://btctransferwallet.com/api/get-coins-list?currentpage=${currentpage}&perpage=20&currency=usd&pricechangepercent`,
      getBtcPriceSuccess,
      getBtcPriceFailure,
    ),
  );
  yield take([LOCATION_CHANGE, types.GET_BTC_PRICE_FAILURE]);
}

export default function* btcPriceSaga() {
  yield takeLatest(types.GET_BTC_PRICE_REQUEST, getBtcPriceList);
}
