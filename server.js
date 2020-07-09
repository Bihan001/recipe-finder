const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config');
const mongooseConnect = require('./Database/MongooseConnect');

mongooseConnect();
const PORT = config.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/', require('./Routes/api/routes'));

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
