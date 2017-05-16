import React from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import List from 'material-ui/svg-icons/action/list';
import RateReview from 'material-ui/svg-icons/maps/rate-review';


export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        {/* insert function into open to handle boolean drawer view */}
        <Drawer
          open={ this.state.open }
          docked={false}
          width={200}
          onRequestChange={(open) => this.setState({open})}
        >
          {/* insert correct user name into h3 below */}
          <h3>Test User</h3>
          <Menu>
            <MenuItem
              onTouchTap={this.handleClose.bind(this)}
              primaryText="My Routines"
              rightIcon={<List />}
            />
            <Divider />
            <MenuItem
              onTouchTap={this.handleClose.bind(this)}
              primaryText="Review Routines"
              rightIcon={<RateReview />}
            />
          </Menu>
        </Drawer>
      </div>
    );
  }
}
