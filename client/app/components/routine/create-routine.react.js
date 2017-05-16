import React from 'react';
import CreateRoutineNav from './create-routine-nav.react.js';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import RoutineActions from '../../flux/actions/routine-actions';
import {Link} from 'react-router';

export default class CreateRoutine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      description: null,
      days: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false
      },
      tasks: [],
      task: ''
    };


    this.handleTaskChange = this.handleTaskChange.bind(this);
  }

  handleChange(fieldName, event) {
    this.setState({[fieldName]: event.target.value});
  }

  handleTaskChange(e) {
    e.preventDefault();
    this.state.tasks.push(this.state.task);
    this.forceUpdate();
    this.textInput.focus();
  }

  handleToggle(day) {
    this.setState({days: Object.assign({}, this.state.days, {
        [day]: !this.state.days[day]
      })});
  }

  handleSubmit() {
    //****************
    // hard coded user, replace when auth is done.
    //****************
    var userId = 1;
    console.log('submitting routine! state is:', this.state);

    $.ajax({
      method: 'POST',
      url: "/routines",
      data: JSON.stringify({name: this.state.name, description: this.state.description, repeat: this.state.days, _creator: userId, tasks: this.state.tasks}),
      dataType: "json",
      contentType: "application/json",
      success: function(res, err) {
        console.log('data posted, res:', res, 'err', err);
      }
    });
    // RoutineActions.add({
    //   name: this.state.name || '',
    //   description: this.state.description || '',
    //   repeat: this.state.days
    // });
  }

  render() {
    const paperStyle = {
      height: 'auto',
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
        <CreateRoutineNav/>
        <div style={centerPaper}>
          <div>
            <Paper style={paperStyle} zDepth={4} className="paper-pad-bot-10">
              <div style={{
                margin: 20
              }}>
                <TextField type="text" hintText="ex. Morning Workout" floatingLabelText="Please input the name of your Routine" fullWidth={true} onChange={this.handleChange.bind(this, 'name')}/><br/>
                <div style={{
                  fontSize: 18 + 'px'
                }}>Repeat</div>

                {Object.keys(this.state.days).map((day) => {
                  return (<Toggle label={[day]} onToggle={this.handleToggle.bind(this, day)} toggled={this.state.days[day]}/>);
                })}

                <Divider/>

                <TextField hintText="ex. My morning workout consisting of stretching, cardio, weightlifting, and some jammin' tunes!" floatingLabelText="Please input the description of your Routine" fullWidth={true} multiLine={true} rows={2} onChange={this.handleChange.bind(this, 'description')}/>
                {this.state.tasks.map((i, k) => {
                  return <div key={k}>{i}</div>
                })}
                  <span className="col-sm-10">
                    <TextField
                      className="task-input"
                      type="text"
                      hintText="ex. 5 sun salutes"
                      floatingLabelText="Add a task to the routine"
                      fullWidth={true}
                      onChange={this.handleChange.bind(this, 'task')}
                      ref={(input) => { this.textInput = input; }}
                      /></span>
                  <span className="col-sm-2 bottom">
                    <RaisedButton onClick={this.handleTaskChange} icon={< AddCircleOutline />} primary={false}/>
                  </span>
                <Link to='/'>
                  <RaisedButton
                    label="Add Routine"
                    labelPosition="before"
                    primary={true}
                    icon={< AddCircleOutline />}
                    onClick={this.handleSubmit.bind(this)}
                    to='/'/>
                </Link>
              </div>
            </ Paper>
          </div>
        </div>
      </div>
    );
  }
}
