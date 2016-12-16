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

import data from '../../utils/api-utils';

export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routines: [],
    };
  }

  componentDidMount() {
    this.getRoutineData();
    // this.getTaskData();
    //
    // RoutineStore.addChangeListener(this.getRoutineData.bind(this));
    // TaskStore.addChangeListener(this.getTaskData.bind(this));
  }

  getRoutineData() {
    data.getRoutines((err, data) => {
      if (err) console.log(err);
      console.log('getRoutineData in routine view:', data);
      this.setState({
        routines: data
      });
    });
  }

  findTasksForRoutine(routine) {
    return routine.tasks;
    // return this.state.tasks.filter((task) => {
    //   return task.routineId === routine._id;
    // });
  }

  findCurrentRoutine() {
    return this.state.routines.filter((routine) => {
      // console.log('finding Current routine:',routine);
      console.log('this.props.params.id', this.props.params.id);
      return this.props.params.id === routine.name;
    });
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
                      text = {routine.name}
                      change = {this.changeRoutine}
                    />
                  {routine.tasks.map((task) => {
                      return (
                        <div key={routine.tasks.indexOf(task)}>
                          <Divider />
                          <InlineEdit text={task} leftCheckbox={<Checkbox />} >
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
