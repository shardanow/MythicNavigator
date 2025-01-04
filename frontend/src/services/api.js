const BASE_URL = "http://localhost:8000";

export const fetchData = async (dataToSend = {}) => {
  const response = await fetch(`${BASE_URL}/test-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};