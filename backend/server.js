const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
require('./database');

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(mongoSanitize());

app.get('*', (req, res) => {                       
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));                               
});

app.listen(() => {
  console.log(`Server is litening on port ${port}.`);
})