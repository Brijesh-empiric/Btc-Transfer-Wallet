import { fromJS } from 'immutable';
import btcPriceReducer from '../reducer';

describe('btcPriceReducer', () => {
  it('returns the initial state', () => {
    expect(btcPriceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
