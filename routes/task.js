const express = require('express');
const Task = require('../models/Task'); // Assuming you have a Task schema
const router = express.Router();

// Middleware to authenticate token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create Task
router.get('/add', async (req, res) => {
  
  try {
  const { title, description, priority, deadline } = req.body;
    //const title ="HI";
    //const description = "bbb";
   //const  priority = "Low";
   //const deadline = "20/12/2024";
   res.status(201).json(req.body);
   exit ;
    const newTask = new Task({
      userId: req.userId,
      title,
      description,
      priority,
      deadline,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
 
});

// Fetch Tasks
router.get('/list', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update Task
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, deadline } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, deadline },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete Task
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
