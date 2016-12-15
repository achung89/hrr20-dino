/**
 *      routine store
 */

import AppDispatcher from '../dispatcher/app-dispatcher';
import RoutineConstants from '../constants/routine-constants';
import Store from './store';

class RoutineStore extends Store {
  constructor() {
    super({
      storeName: 'routines'
    });
    this.getData = this.getData.bind(this);
  }

  getData() {
    console.log("getData in Routinestore");
    $.get('/routines', 'utf8', (data, err)=>{
      this.data.collection = data;

    })
  };
}

let that = new RoutineStore();

//maybe add get in here somehow?
that.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case RoutineConstants.ADD_ROUTINE:
      that._add(action.data);
      break;

    case RoutineConstants.UPDATE_ROUTINE:
      that._update(action.id, action.newData);
      break;

    case RoutineConstants.REMOVE_ROUTINE:
      that._remove(action.id);
      break;

    default:
    // no op
  }

});

export default that;
