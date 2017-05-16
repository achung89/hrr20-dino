import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/application/application.react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

ReactDOM.render(
  <div>
    <MuiThemeProvider>
      <Application />
    </MuiThemeProvider>
  </div>,
  document.getElementById('app-container')
);
