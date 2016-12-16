'use strict';

import * as Colors from 'material-ui/styles/colors';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var theme = exports.theme = {
  zIndex: zIndex,
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  AppBar: {
    textColor: Colors.white
  },
  palette: {
    primary1Color: Colors.deepPurple300,
    primary2Color: Colors.green300,
    primary3Color: Colors.grey200,
    accent1Color: Colors.grey200,
    accent2Color: Colors.green300,
    accent3Color: Colors.green600,
    textColor: Colors.teal900,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    pickerHeaderColor: Colors.green200,
    ToolbarGroup: Colors.blue200,
  }
};

var pink = exports.pink = function() {
  theme.palette.primary1Color = Colors.pink300;
  theme.palette.primary2Color = Colors.cyan300;
}
