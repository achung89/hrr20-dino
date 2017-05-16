/**
 *      user store
 */

import AppDispatcher from '../dispatcher/app-dispatcher';
import UserConstants from '../constants/user-constants';
import Store from './store';

class UserStore extends Store {
  constructor() {
    super({
      storeName: 'users',
      currentUser: null
    });
  }

  setCurrentUser(user) {
    this.db.setCurrentUser(user);
  }
}

let that = new UserStore();

that.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case UserConstants.ADD_USER:
      that._add(action.data);
      break;

    case UserConstants.UPDATE_USER:
      that._update(action.id, action.newData);
      break;

    case UserConstants.REMOVE_USER:
      that._remove(action.id);
      break;

    case UserConstants.SET_CURRENT_USER:
      that.setCurrentUser(action.user);
      break;

    default:
    // no op
  }

});

export default that;
