import { fromJS } from 'immutable';
import adminDetailReducer from '../reducer';

describe('adminDetailReducer', () => {
  it('returns the initial state', () => {
    expect(adminDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
