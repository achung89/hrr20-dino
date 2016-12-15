import React from 'react';
import RoutineNav from './routine-nav.react.js';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Launch from 'material-ui/svg-icons/action/launch';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';

import RoutineStore from '../../flux/stores/routine-store';
import TaskStore from '../../flux/stores/task-store';
import MyRoutines from './my-routines.react.js';
import InlineEdit from 'react-edit-inline';
RoutineStore.useMockData();
TaskStore.useMockData();

export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routines: [],
      tasks: [],
      routineName: this.props.params.id
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

  findCurrentRoutine() {
    return this.state.routines.filter((routine) => {
      return this.props.params.id === routine.name;
    });
  }

  changeRoutine(data) {
    this.setState({
      routineName:data.undefined
    });
    console.log(this.state.routineName);
  }

  render() {
    const paperStyle = {
      height: 600,
      width: 600,
      margin: 20,
      overflow: 'auto'
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const launchTask = (
      <IconButton>
        <Launch />
      </IconButton>
    );

    return (
      <div>
        <RoutineNav />
        <div style={centerPaper}>
          <div>
            <Paper style={paperStyle} zDepth={4}>
              {this.findCurrentRoutine().map((routine) => {
                return (
                  <List>
                    {/* for each task in routine */}
                    {/* add specific task name within primaryText */}
                    <InlineEdit
                      text = {this.state.routineName}
                      change = {this.changeRoutine}
                    />
                    {this.findTasksForRoutine(routine).map((task) => {
                      return (
                        <div key={task.id}>
                          <Divider />
                          <InlineEdit text={task.name} leftCheckbox={<Checkbox />} >
                          </InlineEdit>
                        </div>
                      );
                    })}
                  </List>
                );
              })}
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
