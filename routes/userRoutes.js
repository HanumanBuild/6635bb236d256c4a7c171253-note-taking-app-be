const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register new user
router.post('/register', async (req, res) => {
 try {
 const { email, password } = req.body;
 const user = new User({ email, password });
 await user.save();
 res.status(201).send({ message: 'User created' });
 } catch (error) {
 res.status(400).send(error);
 }
});

// User login
router.post('/login', async (req, res) => {
 try {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (!user) {
 return res.status(404).send({ message: 'User not found' });
 }
 const isMatch = await user.comparePassword(password);
 if (!isMatch) {
 return res.status(401).send({ message: 'Invalid credentials' });
 }
 const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1d' });
 res.send({ token });
 } catch (error) {
 res.status(400).send(error);
 }
});

module.exports = router;