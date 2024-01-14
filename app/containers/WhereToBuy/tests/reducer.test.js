import { fromJS } from 'immutable';
import whereToBuyReducer from '../reducer';

describe('whereToBuyReducer', () => {
  it('returns the initial state', () => {
    expect(whereToBuyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
