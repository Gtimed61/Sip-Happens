const express = require('express');
const connectDB = require('./config/db');
const auth = require('./controllers/auth');

const app = express();

// Connect to the database
connectDB();

app.use(express.json({ extended: false }));

// Define routes
app.post('/register', auth.createUser);
app.post('/login', auth.checkLogin);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
