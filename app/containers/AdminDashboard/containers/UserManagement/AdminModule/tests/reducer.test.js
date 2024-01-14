import { fromJS } from 'immutable';
import adminModuleReducer from '../reducer';

describe('adminModuleReducer', () => {
  it('returns the initial state', () => {
    expect(adminModuleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
