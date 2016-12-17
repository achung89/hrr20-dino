import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import RaisedButton from 'material-ui/RaisedButton';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import IconButton from 'material-ui/IconButton';
import Reorder from 'material-ui/svg-icons/action/reorder';
import * as Colors from 'material-ui/styles/colors';

import { Link,browserHistory } from 'react-router';

export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  logout(e) {
    e.preventDefault();
    console.log(this.state);
    $.ajax({
      type:'GET',
      url:'/logout',
      data: this.state,
      success:function() {
          browserHistory.push('/login');
        },
      error:function() {
          browserHistory.push('/login');
      }
    })
  }
  render() {
    const logoStyle = {
      fontWeight: 'bold',
      fontSize: 24,
      colors: Colors.white
    };
    const titleStyle = {
      fontSize: 24,
      colors: Colors.white
    };
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            {/* handle reorder href to open SideMenu */}
            <IconButton>
              <Reorder />
            </IconButton>
            <Link to='/'>
              <ToolbarTitle style={logoStyle} text="DinoParrotTask" />
            </Link>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <ToolbarTitle style={titleStyle} text="Current Routine" />
            <ToolbarSeparator />
            <RaisedButton
              label="Logout"
              labelPosition="before"
              primary={true}
              icon={<PowerSettingsNew />}
              onClick={this.logout.bind(this)}/>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
