import  { useState } from 'react';
import axios from 'axios';

function App() {
  const [apiType, setApiType] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [responseTime, setResponseTime] = useState('');
  const [payloadSize, setPayloadSize] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/hello', {
        api_type: apiType,
        endpoint: endpoint,
        response_time: responseTime,
        payload_size: payloadSize
      });
      setResponse(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const handleEnqueue = async () => {
    try {
      await axios.post('http://localhost:5000/enqueue', {
        apiType,
        payload: JSON.parse(payload),
        priority
      });
    } catch (error) {
      console.error('Error while enqueueing request:', error.message);
    }
  };

  const handleProcess = async () => {
    try {
      await axios.post('http://localhost:5000/process', { queueType: 'priority' });
    } catch (error) {
      console.error('Error while processing queue:', error.message);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/metrics');
      setMetrics(response.data);
    } catch (error) {
      console.error('Error while fetching metrics:', error.message);
    }
  };

  return (
    <div className="App">
    <h1>Load Balancing </h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>API Type:</label>
        <input type="text" value={apiType} onChange={(e) => setApiType(e.target.value)} />
      </div>
      <div>
        <label>Endpoint:</label>
        <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
      </div>
      <div>
        <label>Response Time:</label>
        <input type="text" value={responseTime} onChange={(e) => setResponseTime(e.target.value)} />
      </div>
      <div>
        <label>Payload Size:</label>
        <input type="text" value={payloadSize} onChange={(e) => setPayloadSize(e.target.value)} />
      </div>
      <button type="submit">Send Request</button>
    </form>
    {response && (
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    )}
  </div>
  );
}

export default App;
