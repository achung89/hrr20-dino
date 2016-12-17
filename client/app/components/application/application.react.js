import React from 'react';
import Routine from '../routine/routine.react';
import CreateRoutine from '../routine/create-routine.react';
import MyRoutines from '../routine/my-routines.react';
import Task from '../task/task.react';
import CreateTask from '../task/create-task.react';
import Home from '../home/home.react';
import SideMenu from '../side-menu/side-menu.react';
import { Link, Router, Route, browserHistory } from 'react-router';
// import data from '../../utils/api-utils';

// material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as themes from '../theme/theme';

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'green'
    }

    this.colorChange = this.colorChange.bind(this);
  }

  colorChange(colorName) {
    this.setState({
      color: colorName
    });
  }


  render() {

    return (
      <div id='application'>
        <MuiThemeProvider muiTheme={themes.getTheme(this.state.color)} >
          <Router history={browserHistory}>
            <Route path='/'
              component={()=>(<MyRoutines colorChange={this.colorChange} />)}

              >

            </Route>
            <Route  path='/create-task' 
                   component={CreateTask}> 
            </Route>
            <Route path='/routines/:id'
                   component={Routine}
                   test={[1, 2, 3]}
            />
            <Route  path='/create-routine'
                    component={CreateRoutine}>
            </Route>
            <Route  path='/create-task'
                    component={CreateTask}>
            </Route>
            <Route path='/tasks/:id'
                   component={Task}
            />
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}
