import { fromJS } from 'immutable';
import addressManagementReducer from '../reducer';

describe('addressManagementReducer', () => {
  it('returns the initial state', () => {
    expect(addressManagementReducer(undefined, {})).toEqual(fromJS({}));
  });
});
