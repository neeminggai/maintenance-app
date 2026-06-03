const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));  // Serve static files from the 'public' directory

// connect to MongoDB
// const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/maintenanceDB?retryWrites=true&w=majority';
const uri = 'mongodb://localhost:27017/maintenanceDB';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Connection error:', err));

// Routes
const jobRoutes = require('./routes/job.routes');
app.use('/api/jobs', jobRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});