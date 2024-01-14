import { fromJS } from 'immutable';
import adminKycReducer from '../reducer';

describe('adminKycReducer', () => {
  it('returns the initial state', () => {
    expect(adminKycReducer(undefined, {})).toEqual(fromJS({}));
  });
});
