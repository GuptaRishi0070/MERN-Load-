const express = require('express');
const app = express();
const port = 5000;
const loadBalancerRoutes = require('./routes/loadBalancerRoutes');
const connectDB = require('./config/db'); // If using MongoDB
const Notes = require('../server/models/metric')
const cors = require("cors");
app.use(cors());
// Connect to database

app.use(express.json());
app.use('/api', loadBalancerRoutes);
app.post('/hello', (req,res)=> {
    const {api_type,endpoint, response_time,payload_size} = req.body;
    console.log(req.body)

    const note = new Notes({
        api_type,
        endpoint,
        response_time,
        payload_size,
      });
      note.save()
      res.json(note)
})
// Handle port already in use error
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Error handling for port already in use
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        // Optionally, try a different port or exit the application
        process.exit(1);
    } else {
        console.error('An error occurred while starting the server:', err);
    }
});
