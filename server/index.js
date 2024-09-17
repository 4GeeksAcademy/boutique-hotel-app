const express = require('express');
const cors = require('cors');
const { PORT, NODE_ENV } = require('./environment');

const app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

// Enable CORS for specific origin
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  });


