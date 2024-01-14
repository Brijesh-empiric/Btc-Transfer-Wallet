import * as types from './constants';
import action from 'utils/action';

export const createAdminRequest = action(types.CREATE_ADMIN_REQUEST, 'data');
export const createAdminSuccess = action(
  types.CREATE_ADMIN_SUCCESS,
  'successResponse',
);
export const createAdminFailure = action(
  types.CREATE_ADMIN_FAILURE,
  'errorResponse',
);

export const clearAdminModuleState = action(types.CLEAR_ADMIN_MODULE_STATE);
