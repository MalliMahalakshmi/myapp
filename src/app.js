const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

// Connect to MongoDB
mongoose.connect(mongoURI, {
 
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/styles')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routes
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/home', (req, res) => {
    res.render('home')
})
app.get('/plant', (req, res) => {
    res.render('plant')
})
app.get('/resources', (req, res) => {
    res.render('resources')
})
app.get('/Tools', (req, res) => {
    res.render('Tools')
})
app.get('/Community', (req, res) => {
    res.render('Community')
})


app.post('/signup', async (req, res) => {
  try {
    const existingUser = await User.findOne({ name: req.body.name });

    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).render('home', { user: req.body.name });
  } catch (error) {
    console.error('Error in sign-up:', error);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
      res.status(200).render('home', { user: req.body.name });
    } else {
      res.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
