const express = require('express');
require('./database');

const port = process.env.PORT || 8000;

const app = express();

app.listen(() => {
  console.log(`Server is litening on port ${port}.`);
})