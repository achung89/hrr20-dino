import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router';

export default class PreAuthNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const logoStyle = {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#FFFFFF'
    };
    return (
      <div>
        <Toolbar>
            <ToolbarGroup style={{paddingLeft:'50%'}}>
             <Link to='/' >
              <ToolbarTitle style={logoStyle} text="DinoTask" />
            </Link>
            </ToolbarGroup>

          <ToolbarGroup lastChild={true}>
            <RaisedButton
              label="Login / Signup"
              labelPosition="before"
              primary={true}
              />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
