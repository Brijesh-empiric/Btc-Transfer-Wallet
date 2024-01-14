import { fromJS } from 'immutable';
import customerModuleReducer from '../reducer';

describe('customerModuleReducer', () => {
  it('returns the initial state', () => {
    expect(customerModuleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
