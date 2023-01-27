const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(db.mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.listen(3000, () => console.log('Server started on port 3000'));
