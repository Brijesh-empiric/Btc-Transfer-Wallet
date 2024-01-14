import { fromJS } from 'immutable';
import customerQueriesReducer from '../reducer';

describe('customerQueriesReducer', () => {
  it('returns the initial state', () => {
    expect(customerQueriesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
