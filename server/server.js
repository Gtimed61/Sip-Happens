const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.resolve('client', 'build')));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(db.mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
