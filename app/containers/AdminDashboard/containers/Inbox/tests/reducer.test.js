import { fromJS } from 'immutable';
import inboxReducer from '../reducer';

describe('inboxReducer', () => {
  it('returns the initial state', () => {
    expect(inboxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
