import React from 'react';
import CreateTaskNav from './create-task-nav.react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const paperStyle = {
      height: 300,
      width: 400,
      margin: 20
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const style = {
      margin: 12
    };

    return (
      <div>
        <CreateTaskNav />
        <div style={centerPaper}>
          <div>
            <Paper style={paperStyle} zDepth={4}>
              {/* inser onChange into text field */}
              <div style={{margin: 20}}>
                <TextField
                  type="text"
                  hintText="ex. Morning jog for 30 minutes"
                  floatingLabelText="Please Input Task Name"
                  fullWidth={true}
                /><br />
                <TextField
                  hintText="ex. My morning jog consisted of 4 minute intervals with 1 minute rest periods along the San Fransisco Bay"
                  floatingLabelText="Please Input Task Description"
                  fullWidth={true}
                  multiLine={true}
                  rows={4} />
                <div><br />
                <RaisedButton
                  label="Add Task"
                  labelPosition="before"
                  primary={true}
                  icon={<AddCircleOutline />}
                  style={{marginLeft: '32%'}}
                />
              </div>
              </div>
            </ Paper>
          </div>
        </div>
      </div>

    );
  }
}
