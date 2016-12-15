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
<<<<<<< 3a07691161c06fc05a849b639fb15efdb1018697
      // tasks: []
=======
      tasks: [],

>>>>>>> Plan for implementing state change
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

  handleToggleCheckbox(e) {
    console.log('YO', this, e)
    // swap state at passed in id
    // if(state.toggle[id].textDecoration === 'none') {
    //  state.toggle[id].textDecoration = 'line-through'
    // } else {
    //  state.toggle[id].textDecoration = 'none'
    // }
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
        {this.state.routines.map((routine) => {
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
                      <Divider />
                      {/* insert onTapTouch for ListItem */}
                      <ListItem
                        primaryText={task}
                        style={{textDecoration: 'line-through'}}
                        leftCheckbox={<Checkbox />}
                        onChange={this.handleTaskLineThrough.bind(this)}
                        rightIcon={<Link params={{ name: routine.name }} to={`/tasks/${task}`}><Launch /></Link>}
                      >
                      </ListItem>
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
