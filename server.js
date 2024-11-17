const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);
app.use(express.static('public')); // Serve static files from the 'public' directory

// Connect to MongoDB
mongoose
 .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
