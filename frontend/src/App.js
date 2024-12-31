import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import './App.css';

let requestQueue = Promise.resolve(); // Initialize an empty promise queue
let isFetching = false; // Flag to prevent duplicate requests

function App() {
  const [recievedData, setRecievedData] = useState({});
  const [newData, setNewData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [inputData, setInputData] = useState("");
  const [stepButtons, setStepButtons] = useState([]);

  const fetchData = async (dataToSend = {}) => {
    setMessage("Loading...");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Fetched Data:", result);

      // Update newData and receivedData with the fetched result
      setRecievedData(result);
      setNewData({
        ...cloneDeep(result),
        user_data: {
          custom_prompt: inputData,
          choosed_step: [],
        },
      });

      // Generate step buttons
      const steps = result.generator_response_data?.steps || [];
      const buttons = steps.map((step) => (
        <button key={`${step.id}-${step.description}`} onClick={() => handleStepClick(step)}>
          {step.description}
        </button>
      ));
      setStepButtons(buttons);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  const enqueueFetchData = (dataToSend) => {
    if (isFetching) return; // Prevent duplicate requests
    isFetching = true;

    requestQueue = requestQueue
      .then(() => fetchData(dataToSend))
      .finally(() => {
        isFetching = false; // Reset flag
      });
  };

  const handleStepClick = (step) => {
    console.log("Current New Data Before Modification:", newData);
  
    // Update state and enqueue the API request
    setNewData((prevData) => {
      // Clone the previous state to modify safely
      const updatedData = cloneDeep(prevData);
  
      if (!updatedData.user_data) {
        updatedData.user_data = {
          custom_prompt: inputData || "",
          choosed_step: [],
        };
      }
  
      // Update the `choosed_step` in `user_data`
      updatedData.user_data.choosed_step = [
        {
          id: step.id,
          description: step.description,
          risk_level: step.risk_level,
          time_estimate: step.time_estimate,
        },
      ];
  
      // Move `generator_response_data` to `prev_generator_response_data`
      updatedData.prev_generator_response_data = updatedData.generator_response_data;
      delete updatedData.generator_response_data;
  
      // Remove unnecessary logs
      delete updatedData.logs;
  
      console.log("Updated Data After Step Click (Inside Functional Update):", updatedData);
  
      // Enqueue the API request with the fully updated data
      enqueueFetchData(updatedData);
  
      return updatedData; // Return the updated data to set the new state
    });
  };
  

  useEffect(() => {
    console.log("New Data Updated in State:", newData);
  }, [newData]);

  return (
    <div className="App">
      <h1>React Frontend Connected to API!</h1>
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter the custom prompt here..."
      />
      <button onClick={() => fetchData()}>Init</button>
      <div>
        <h2>Steps</h2>
        {stepButtons}
      </div>
      {loading ? <p>{message}</p> : <pre>{JSON.stringify(recievedData, null, 2)}</pre>}
      <div>
        <h2>Updated Data</h2>
        {Object.keys(newData).length > 0 ? (
          <pre>{JSON.stringify(newData, null, 2)}</pre>
        ) : (
          <p>Updated data not available yet.</p>
        )}
      </div>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
