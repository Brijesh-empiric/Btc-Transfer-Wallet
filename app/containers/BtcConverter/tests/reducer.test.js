import { fromJS } from 'immutable';
import btcConverterReducer from '../reducer';

describe('btcConverterReducer', () => {
  it('returns the initial state', () => {
    expect(btcConverterReducer(undefined, {})).toEqual(fromJS({}));
  });
});
