import { fromJS } from 'immutable';
import adminMultiFactorLoginReducer from '../reducer';

describe('adminMultiFactorLoginReducer', () => {
  it('returns the initial state', () => {
    expect(adminMultiFactorLoginReducer(undefined, {})).toEqual(fromJS({}));
  });
});
