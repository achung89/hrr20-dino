import React from 'react';
import Divider from 'material-ui/Divider';
import Launch from 'material-ui/svg-icons/action/launch';
import { Link } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';


export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strikeStyle: {textDecoration: 'none'}
    };
  }

  handleToggleCheckbox() {
    // console.log('YO', this.state, this.state.strikeStyle.textDecoration, key)//, this.state.tasks, task.style)
    // this.setState({strikeStyle:{textDecoration: 'none'}});
    // task.style = {textDecoration: 'line-through'}
    // swap state at passed in id
    if(!this.state.strikeStyle.textDecoration) {
      this.setState({strikeStyle:{textDecoration: 'none'}});
    }
    // let keyLocation = this.state.routines
    if(this.state.strikeStyle.textDecoration === 'none') {
     this.setState({strikeStyle:{textDecoration: 'line-through'}});
    } else {
     this.setState({strikeStyle:{textDecoration: 'none'}})
    }
  };

render(){
  return (
    <div>
      <Divider />
      {/* insert onTapTouch for ListItem */}
      <ListItem
        primaryText={this.props.task}
        leftCheckbox={<Checkbox />}
        onChange={this.handleToggleCheckbox.bind(this)}
        style={this.state.strikeStyle}
        rightIcon={<Link params={{ name: this.props.routine.name }} to={`/tasks/${this.props.task.name}`}><Launch /></Link>}
      >
      </ListItem>
    </div>
  )
};
}