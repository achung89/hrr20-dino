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

// flux
import RoutineStore from '../../flux/stores/routine-store';
import TaskStore from '../../flux/stores/task-store';
import RoutineActions from '../../flux/actions/routine-actions';


RoutineStore.useMockData();
TaskStore.useMockData();

export default class MyRoutines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routines: [],
      tasks: [],
      strikeStyle: {
        textDecoration: 'line-through'
      }

    };
  }

  componentDidMount() {
    this.getRoutineData();
    this.getTaskData();

    RoutineStore.addChangeListener(this.getRoutineData.bind(this));
    TaskStore.addChangeListener(this.getTaskData.bind(this));
  }

  componentWillUnmount() {
    RoutineStore.removeChangeListener(this.getRoutineData);
    TaskStore.removeChangeListener(this.getTaskData);
  }

  getRoutineData() {
    RoutineStore
      .get()
      .then((data) => {
        this.setState({
          routines: data.collection
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
    return this.state.tasks.filter((task) => {
      return task.routineId === routine.id;
    });
  }

  handleRemoveRoutine(id) {
    RoutineActions.remove(id);
  }

  handleToggleCheckbox(task) {
    console.log('YO', this.state)//, this.state.tasks, task.style)
    // this.setState({strikeStyle:{textDecoration: 'none'}});
    // task.style = {textDecoration: 'line-through'}
    // swap state at passed in id
    if(this.state.strikeStyle === 'none') {
     this.setState({strikeStyle:{textDecoration: 'line-through'}});
    } else {
     this.setState({strikeStyle:{textDecoration: 'none'}});
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
        {this.state.routines.map((routine) => {
          return (
            <Paper key={routine.id} style={paperStyle} zDepth={4}>
              {/* insert onTapTouch for FlatButton */}
              <AppBar
                title={routine.name}
                titleStyle={{fontSize: 18}}
                iconElementLeft={ <IconButton onClick={this.handleRemoveRoutine.bind(this, routine.id)}>
                                    <NavigationClose />
                                  </IconButton> }
                iconElementRight={ <Link params={{ name: routine.name }} to={`/routines/${routine.name}`}><IconButton><Launch /></IconButton></Link> }
              />
              <List>

                {/*for each task in routine */}
                {this.findTasksForRoutine(routine).map((task) => {
                  return (
                    <div key={task.id}>
                      <Divider />
                      {/* insert onTapTouch for ListItem */}
                      <ListItem
                        primaryText={task.name}
                        leftCheckbox={<Checkbox />}
                        onChange={this.handleToggleCheckbox.bind(this)}
                        style={this.state.strikeStyle}
                        rightIcon={<Link params={{ name: routine.name }} to={`/tasks/${task.name}`}><Launch /></Link>}
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
