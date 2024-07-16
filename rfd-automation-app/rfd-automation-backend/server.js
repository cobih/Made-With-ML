require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('MongoDB URI:', process.env.MONGODB_URI);
  });

// Add this to log any MongoDB errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB error after initial connection:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Tender Schema
const tenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Tender = mongoose.model('Tender', tenderSchema);

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new tender
app.post('/api/tenders', verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const tender = new Tender({
      title,
      description,
      user: req.user.id
    });
    await tender.save();
    res.status(201).json(tender);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tender' });
  }
});

// Get all tenders for a user
app.get('/api/tenders', verifyToken, async (req, res) => {
  try {
    const tenders = await Tender.find({ user: req.user.id });
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenders' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));