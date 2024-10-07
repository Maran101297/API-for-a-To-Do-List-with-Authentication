const express = require('express');

const {connectDB, closeDB} = require('./serverModule/config/db');
const authRouters = require('./serverModule/routes/authRoutes');
const todoRouters = require('./serverModule/routes/todoRoutes');

const cors = require('cors')
const fs = require('fs');
const path = require('path');
const app = express();
const configJsonFile = path.join(process.cwd(), "ejsConfig/config.json");

require('dotenv').config();


const data = fs.readFileSync(configJsonFile, 'utf8');
 global.config = JSON.parse(data);


//midlleware 
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/api', authRouters);
app.use('/api/todos', todoRouters);

app.use(cors())
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));

app.use("/public", express.static(path.join(process.cwd(), "/public")));

// Database Connection
connectDB();


// SIGINT (Signal Interrupt) is a signal sent to a process to request its interruption or termination.
process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
  });
  
  // SIGTERM (Signal Terminate) is a signal sent to a process to request its termination. 
  process.on('SIGTERM', async () => {
    await closeDB();
    process.exit(0);
  });

module.exports = app;

