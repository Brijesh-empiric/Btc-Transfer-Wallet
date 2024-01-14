import { fromJS } from 'immutable';
import emailVerificationReducer from '../reducer';

describe('emailVerificationReducer', () => {
  it('returns the initial state', () => {
    expect(emailVerificationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
