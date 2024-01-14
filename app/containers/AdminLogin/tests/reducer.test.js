import { fromJS } from 'immutable';
import adminLoginReducer from '../reducer';

describe('adminLoginReducer', () => {
  it('returns the initial state', () => {
    expect(adminLoginReducer(undefined, {})).toEqual(fromJS({}));
  });
});
