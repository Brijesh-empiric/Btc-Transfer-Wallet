import { fromJS } from 'immutable';
import termsAndConditionsReducer from '../reducer';

describe('termsAndConditionsReducer', () => {
  it('returns the initial state', () => {
    expect(termsAndConditionsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
