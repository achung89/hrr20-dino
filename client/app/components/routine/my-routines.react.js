import React from 'react';
import MyRoutinesNav from './my-routines-nav.react.js';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Launch from 'material-ui/svg-icons/action/launch';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router';

import data from '../../utils/api-utils';

import TaskTest from '../task/taskTest.react.js';
// flux
// import RoutineStore from '../../flux/stores/routine-store';
// import TaskStore from '../../flux/stores/task-store';
// import RoutineActions from '../../flux/actions/routine-actions';

//
// RoutineStore.useMockData();
// TaskStore.useMockData();

export default class MyRoutines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routines: [],
      tasks: [],
      strikeStyle: {textDecoration: 'none'}
    };
  }

  componentDidMount() {
    // RoutineStore.getData();
    this.getRoutineData();
    // this.getTaskData();
    // this.forceUpdate();
    //
    // RoutineStore.addChangeListener(this.getRoutineData.bind(this));
    // TaskStore.addChangeListener(this.getTaskData.bind(this));
  }

  componentWillUnmount() {
    // RoutineStore.removeChangeListener(this.getRoutineData);
    // TaskStore.removeChangeListener(this.getTaskData);
  }

  getRoutineData() {
    data.getRoutines((err, data) => {
      if (err) console.log(err);
      // console.log('getRoutineData', data);
      this.setState({
        routines: data
      });
    });
  }

  getTaskData() {
    TaskStore
      .get()
      .then((data) => {
        this.setState({
          tasks: data.collection
        });
      });
  }

  findTasksForRoutine(routine) {
    return routine.tasks;
    // return this.state.tasks.filter((task) => {
    //   return task.routineId === routine._id;
    // });
  }

  handleRemoveRoutine(id) {
    RoutineActions.remove(id);
  }

  handleToggleCheckbox(key, i) {
    console.log('YO', this.state, this.state.strikeStyle.textDecoration, key)//, this.state.tasks, task.style)
    // this.setState({strikeStyle:{textDecoration: 'none'}});
    // task.style = {textDecoration: 'line-through'}
    // swap state at passed in id
    if(!this.state.strikeStyle.textDecoration) {
      this.setState({strikeStyle:{textDecoration: 'none'}});
    }
    // let keyLocation = this.state.routines
    if(this.state.strikeStyle.textDecoration === 'none') {
     this.setState({strikeStyle:{textDecoration: 'line-through'}});
    } else {
     this.setState({strikeStyle:{textDecoration: 'none'}})
    }
  };

  render() {
    const paperStyle = {
      float: 'left',
      height: 400,
      width: 300,
      margin: 30,
      overflow: 'auto'
    };

    return (
      <div>
        <MyRoutinesNav />
        {this.state.routines.map((routine, i) => {
          return (
            <Paper key={routine._id} style={paperStyle} zDepth={4}>
              {/* insert onTapTouch for FlatButton */}
              <AppBar
                title={routine.name}
                titleStyle={{fontSize: 18}}
                iconElementLeft={ <IconButton onClick={this.handleRemoveRoutine.bind(this, routine._id)}>
                                    <NavigationClose />
                                  </IconButton> }
                iconElementRight={ <Link params={{ name: routine.name }} to={`/routines/${routine.name}`}><IconButton><Launch /></IconButton></Link> }
              />
              <List>

                {/*for each task in routine */}
                {routine.tasks.map((task, k) => {
                  return (
                    <div key={k}>
                      <TaskTest primaryText={task} routine={routine} task={task}/>
                    </div>
                  );
                })}
              </List>
            </Paper>
          );
        })}
      </div>
    );
  }
}
