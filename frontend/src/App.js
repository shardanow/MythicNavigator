import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/") // URL твоего API
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>React Frontend Connected to API!</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
