import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users');
        console.log('Data from backend:', response.data); // Log the data to check its structure
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Whether the request succeeds or fails, set loading to false
      }
    };
  
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export default MyComponent;
