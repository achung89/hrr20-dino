'use strict';

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const config = require('./config/express');
const routes = require('./routes');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

require('./config/express')(app);
const router = require('./routes')(app, express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());
app.delete('*', cors());

app.use('/', router);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
