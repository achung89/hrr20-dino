import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {Link,context} from 'react-router';

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
      color: '#FFFFFF',
      paddingLeft:'41%'
    };
      return (
        <div>
            <Toolbar>
            <ToolbarTitle style = {logoStyle} firstChild={true} text={(window.location.pathname==='/signup')?'DinoParrotTask':''}/>
              <ToolbarGroup lastChild={true}>
              <Link to="/signup" style = {{marginRight:'1em'}}>
                <RaisedButton
                  label="Signup"
                  labelPosition="before"
                  primary={true}
                  />
              </Link>
              <Link to="/login" style = {{marginRight:'2em'}}>
                <RaisedButton
                  label="Log In"
                  labelPosition="before"
                  primary={true}
                  />
              </Link>
            </ToolbarGroup>
          </Toolbar>
        </div>
      );
  }
}
