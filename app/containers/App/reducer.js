import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import * as types from './constants';
import { contentTemplateSchema } from './schemas';

const initialState = fromJS({
  requesting: false,
  ownDashboard: true,
  dialog: {},
  token: '',
  user: {},
  success: false,
  contentTemplateNormalized: {},
  localeSet: false,
  error: null,
  btcPriceList: {
    dataList: [],
    currentPage: 1,
    totalItems: 0,
  },
});

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.NOT_USER:
      return state.merge({
        ownDashboard: false,
      });
    case types.SHOW_DIALOG:
      return state.merge({
        dialog: fromJS(action.payload),
      });
    case types.SET_TOKEN:
      return state.merge({
        token: action.payload,
      });
    case types.SET_USER:
      return state.merge({
        user: fromJS(action.payload),
      });
    case types.GET_BTC_PRICE_REQUEST:
      return state.merge({
        btcPriceList: {
          dataList: [],
          currentPage: 1,
          totalItems: 0,
        },
        error: '',
        success: false,
        requesting: true,
      });
    case types.GET_BTC_PRICE_SUCCESS:
      return state.merge({
        btcPriceList: {
          dataList: fromJS(action.response.data),
          currentPage: fromJS(action.response.pagination.currentPage),
          totalItems: fromJS(action.response.pagination.totalItems),
        },
        error: '',
        success: true,
        requesting: false,
      });
    case types.GET_BTC_PRICE_FAILURE:
      return state.merge({
        error: '',
        success: false,
        requesting: true,
      });

    default:
      return state;
  }
}

export default reducer;
