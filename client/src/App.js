import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
    .then(response => setMessage(response.data.message))
    .catch(error => {
      console.error('Error:', error);
      // If the first request fails, try the fallback port
      return axios.get('http://localhost:5001/api/hello');
    })
    .then(response => {
      if (response) setMessage(response.data.message);
    })
    .catch(error => console.error('Error on fallback:', error));
  }, []);

  return (
    <div className="App">
      <h1>React, Express, Node.js Template</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;