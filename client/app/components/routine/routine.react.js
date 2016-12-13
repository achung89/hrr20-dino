import React from 'react';
import RoutineNav from './routine-nav.react.js';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Launch from 'material-ui/svg-icons/action/launch';

export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const paperStyle = {
      height: 600,
      width: 600,
      margin: 20,
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div>
        <RoutineNav />
        <div style={centerPaper}>
          <div>
            <Paper style={paperStyle} zDepth={4}>
              <List>
                {/*for each task in routine*/}
                <ListItem
                  {/* add specifc routine name within primaryText */}
                  primaryText="Test"
                  rightIcon={<Launch />}
                />
              </List>
              <Divider />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
