const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const mongooseConnect = require('./Database/MongooseConnect');

mongooseConnect();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/', require('./Routes/api/routes'));

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
