import { fromJS } from 'immutable';
import userManagementReducer from '../reducer';

describe('userManagementReducer', () => {
  it('returns the initial state', () => {
    expect(userManagementReducer(undefined, {})).toEqual(fromJS({}));
  });
});
