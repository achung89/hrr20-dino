import React from 'react';
// import UserStore from '../stores/user-store';
// import UserActions from '../actions/user-actions';
// import RoutineStore from '../stores/routine-store';
// import RoutineActions from '../actions/routine-actions';
// import TaskStore from '../stores/task-store';
// import TaskActions from '../actions/task-actions';
import TaskNav from './task-nav.react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Launch from 'material-ui/svg-icons/action/launch';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const paperStyle = {
      height: 190,
      width: 400,
      margin: 15,
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const textFieldStyle = {
      margin: 25
    };
    const taskStyle = {
      padding: 5,
      marginLeft: 17,
      marginRight: 17
    };
    const navClose = {
      marginLeft: 10,
      marginTop: 10
    };

    return (
      <div>
        <TaskNav />
        <div style={centerPaper}>
          <div>
            <Paper style={paperStyle} zDepth={4}>
            <div>
              <Link to='/'>
                <ArrowBack />
              </Link>
            </div>
            <div style={taskStyle}>
              <h3>{this.props.params.id}</h3>
            </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }

}
