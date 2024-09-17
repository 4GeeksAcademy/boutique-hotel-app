const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const fallbackPort = 5001;


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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${fallbackPort}`);
      app.listen(fallbackPort, () => {
        console.log(`Server running on port ${fallbackPort}`);
      });
    } else {
      console.error(err);
    }
  });


