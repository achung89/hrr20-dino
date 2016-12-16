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
    if(this.state.strikeStyle.textDecoration === 'none') {
     this.setState({strikeStyle:{textDecoration: 'line-through'}});
    } else {
     this.setState({strikeStyle:{textDecoration: 'none'}});
    }
  };

render(){
  return (
    <div>
      <Divider />
      <ListItem
        primaryText={this.props.task}
        leftCheckbox={<Checkbox />}
        onClick={this.handleToggleCheckbox.bind(this)}
        style={this.state.strikeStyle}
        rightIcon={<Link params={{ name: this.props.routine.name }} to={`/tasks/${this.props.task}`}><Launch /></Link>}
      >
      </ListItem>
    </div>
  )
};
}
