import action from 'utils/action';
import * as types from './constants';

export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION,
  };
}

export const forgetPasswordRequest = action(
  types.FORGET_PASSWORD_REQUEST,
  'email',
);
export const forgetPasswordSuccess = action(
  types.FORGET_PASSWORD_SUCCESS,
  'response',
);
export const forgetPasswordFailure = action(
  types.FORGET_PASSWORD_FAILURE,
  'error',
);

export const forgetPasswordClearState = action(
  types.FORGET_PASSWORD_CLEAR_STATE,
);
export const forgetPasswordClearMessages = action(
  types.FORGET_PASSWORD_CLEAR_MESSAGES,
);
