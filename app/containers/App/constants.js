const isProdEnv = process.env.NODE_ENV === 'production';
// http://104.197.123.145:8000/api/
export const API_BASE = isProdEnv
  ? // ? 'https://9ecdd2389871.ngrok.io/api/'
    // : 'https://9ecdd2389871.ngrok.io/api/';
    'https://btctransferwallet.com/api/'
  : 'https://btctransferwallet.com/api/';

// https://btcwallet.uk.com/api/

//   'https://67154cb6fce1.ngrok.io/api/'
// : 'https://67154cb6fce1.ngrok.io/api/';
//  : 'http://104.197.123.145:8000/api/';

export const RECAPTCHA_SITE_KEY = '6LfRNdgUAAAAANYlMF47bUNQDuIQSdIj-pd8RZv6';
export const TINY_MCE_API_KEY =
  '71o0brn86hzecge3iws7rnliwju4auv5zk5ku0v5uo56ten2';

export const LOGIN_BY_TOKEN_REQUEST = 'app/App/LOGIN_BY_TOKEN_REQUEST';
export const LOGIN_BY_TOKEN_SUCCESS = 'app/App/LOGIN_BY_TOKEN_SUCCESS';
export const LOGIN_BY_TOKEN_FAILURE = 'app/App/LOGIN_BY_TOKEN_FAILURE';

export const SHOW_DIALOG = 'app/App/SHOW_DIALOG';
export const SET_TOKEN = 'app/App/SET_TOKEN';
export const SET_USER = 'app/App/SET_USER';

/* Localization Constants Start  */
export const DEFAULT_LOCALE = 'en';
export const CHANGE_LOCALE = 'app/App/CHANGE_LOCALE';

/* Localization Constants End  */

export const NOT_USER = 'app/App/NOT_USER';

export const DOCUMENT_URL_UPDATE =
  process.env.NODE_ENV === 'production' ? '' : '';

export const DOCUMENT_URL = process.env.NODE_ENV === 'production' ? '' : '';

export const GET_BTC_PRICE_REQUEST = 'app/BtcPrice/GET_BTC_PRICE_REQUEST';
export const GET_BTC_PRICE_SUCCESS = 'app/BtcPrice/GET_BTC_PRICE_SUCCESS';
export const GET_BTC_PRICE_FAILURE = 'app/BtcPrice/GET_BTC_PRICE_FAILURE';
