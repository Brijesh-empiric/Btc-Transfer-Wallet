import { fromJS } from 'immutable';
import verifyEmailTokenReducer from '../reducer';

describe('verifyEmailTokenReducer', () => {
  it('returns the initial state', () => {
    expect(verifyEmailTokenReducer(undefined, {})).toEqual(fromJS({}));
  });
});
