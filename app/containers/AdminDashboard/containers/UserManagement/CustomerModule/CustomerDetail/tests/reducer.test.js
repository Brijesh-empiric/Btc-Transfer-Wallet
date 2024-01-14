import { fromJS } from 'immutable';
import customerDetailReducer from '../reducer';

describe('customerDetailReducer', () => {
  it('returns the initial state', () => {
    expect(customerDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
