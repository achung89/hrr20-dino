import React from 'react';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import IconButton from 'material-ui/IconButton';
import Reorder from 'material-ui/svg-icons/action/reorder';
import * as Colors from 'material-ui/styles/colors';
import { Link } from 'react-router';
import * as themes from '../theme/theme';


export default class MyRoutinesNav extends React.Component {
  constructor(props) {
    super(props);
    console.log('myRoutinesNav props', this.props);
    this.themeChange = this.themeChange.bind(this);
  }

  themeChange(color){
    this.props.colorChange(color);
  }

  render() {
    const logoStyle = {
      fontWeight: 'bold',
      fontSize: 24,
      color: Colors.white
    };
    const titleStyle = {
      fontSize: 24,
      color: Colors.white
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
              <ToolbarTitle style={logoStyle} text="DinoTask" />
            </Link>
            <div onClick={()=>this.themeChange('green')}>turn it default</div>
            <div onClick={()=>this.themeChange('pink')}>turn it pink</div>
            <div onClick={()=>this.themeChange('blue')}>turn it blue</div>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            {/* insert onClick/onTapTouch to ArrowBack */}
            <ArrowBack />
            <div style={titleStyle}>My Routines </div>
            <Link to='/create-routine'>
              <RaisedButton
                label="Create routine"
                labelPosition="before"
                primary={true}
                icon={<AddCircleOutline />}
              />
            </Link>
            <ToolbarSeparator />
            {/* insert onClick/onTapTouch to RaisedButton */}
            <RaisedButton
              label="Logout"
              labelPosition="before"
              primary={true}
              icon={<PowerSettingsNew />}
              />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
