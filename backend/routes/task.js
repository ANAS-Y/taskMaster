const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware for authenticating users
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// Create Task
router.post('/', authenticate, async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  try {
    const task = new Task({ 
      title, 
      description, 
      priority, 
      deadline, 
      userId: req.user.id 
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get All Tasks for the User
router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Task
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, deadline } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, priority, deadline },
      { new: true }
    );
    if (!task) return res.status(404).send('Task not found');
    res.status(200).json(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete Task
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).send('Task not found');
    res.status(200).send('Task deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
