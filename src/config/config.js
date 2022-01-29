var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var express = require('express');

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

module.exports.appExpress = app ;
