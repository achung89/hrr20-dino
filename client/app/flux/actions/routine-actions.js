import AppDispatcher from '../dispatcher/app-dispatcher';
import RoutineConstants from '../constants/routine-constants';

export default {
  add(data) {
    AppDispatcher.dispatch({
      actionType: RoutineConstants.ADD_ROUTINE,
      data: data
    });
  },

  remove(id) {
    AppDispatcher.dispatch({
      actionType: RoutineConstants.REMOVE_ROUTINE,
      id: id
    });
  },

  update(data) {
    AppDispatcher.dispatch({
      actionType: RoutineConstants.UPDATE_ROUTINE,
      id: data.id,
      newData: data.newData
    });
  },

  get(data) {
    AppDispatcher.dispatch({
      actionType: RoutineConstants.GET_ROUTINE,
      data: data
    });
  },
};
