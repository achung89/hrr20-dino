import AppDispatcher from '../dispatcher/app-dispatcher';
import TaskConstants from '../constants/task-constants';

export default {
  add(data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.ADD_TASK,
      data: data
    });
  },

  remove(id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.REMOVE_TASK,
      id: id
    });
  },

  update(data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.UPDATE_TASK,
      id: data.id,
      newData: data.newData
    });
  }
};
