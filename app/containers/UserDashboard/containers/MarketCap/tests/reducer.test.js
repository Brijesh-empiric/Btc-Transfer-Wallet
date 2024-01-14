import { fromJS } from 'immutable';
import marketCapReducer from '../reducer';

describe('marketCapReducer', () => {
  it('returns the initial state', () => {
    expect(marketCapReducer(undefined, {})).toEqual(fromJS({}));
  });
});
