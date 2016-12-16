'use strict';

import * as Colors from 'material-ui/styles/colors';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var theme = {
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

var adjustTemplate = (color) => {
  if (color === 'green'){
    theme.palette.primary1Color = Colors.deepPurple300;
    theme.palette.primary2Color = Colors.green300;
    theme.palette.accent2Color = Colors.green300;
    theme.palette.accent3Color = Colors.green600;
    theme.palette.pickerHeaderColor = Colors.green200;
    theme.palette.canvasColor = Colors.white;
    document.body.style.background="#C8E6C9";
  } else if (color === 'pink'){
    theme.palette.primary1Color = Colors.pink300;
    theme.palette.primary2Color = Colors.cyan300;
    theme.palette.accent2Color = Colors.grey300;
    theme.palette.accent3Color = Colors.grey600;
    theme.palette.pickerHeaderColor = Colors.grey600;
    theme.palette.canvasColor = Colors.white;
    document.body.style.background="#545454";
  } else if (color === 'blue'){
    theme.palette.primary1Color = Colors.lightBlue500;
    theme.palette.primary2Color = Colors.cyan300;
    theme.palette.accent2Color = Colors.lightBlue300;
    theme.palette.accent3Color = Colors.grey600;
    theme.palette.pickerHeaderColor = Colors.lightBlue900;
    theme.palette.canvasColor = Colors.lightBlue50;
    document.body.style.background="white";
  }

}

var getTheme = exports.getTheme = (color) => {
  if (color) adjustTemplate(color);
  return getMuiTheme(theme);
}
