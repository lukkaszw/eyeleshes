const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const auth = require('./middlewares/auth');
require('./database');

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(mongoSanitize());


app.listen(port, () => console.log(`Server is listening on port ${port}!`));

const userRouter = require('./routes/user.routes');
const clientRouter = require('./routes/client.routes');

app.use('/api/user', userRouter);
app.use('/api/clients', auth, clientRouter);

app.get('*', (req, res) => {                       
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));                               
});