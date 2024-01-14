import { fromJS } from 'immutable';
import verifyAdminEmailTokenReducer from '../reducer';

describe('verifyAdminEmailTokenReducer', () => {
  it('returns the initial state', () => {
    expect(verifyAdminEmailTokenReducer(undefined, {})).toEqual(fromJS({}));
  });
});
