import React, { useState } from 'react';
import axios from 'axios';

const NotificationViewer = () => {
  const [inputId, setInputId] = useState('');
  const [message, setMessage] = useState('');
  const [fetchId, setFetchId] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleSend = async () => {
    try {
      await axios.post('http://localhost:4000/api/notifications', {
        userId: inputId,
        message: message
      });
      alert('Notification sent!');
    } catch (err) {
      console.error('Error sending notification:', err);
    }
  };

  const handleFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/notifications/${fetchId}`);
      setNotifications(response.data);
      console.log('Fetched notifications:', response.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setNotifications([]);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1><b>Notification System (POC)</b></h1>
      <h2>Send Notification</h2>
      <input
        type="text"
        placeholder="User ID"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>

      <hr />

      <h2>📩 Your Notifications</h2>
      <input
        type="text"
        placeholder="Enter User ID to Fetch"
        value={fetchId}
        onChange={(e) => setFetchId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>

      <div>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#f0f8ff',
              borderRadius: '8px'
            }}
          >
            <h3>📢 {n.message}</h3>
            <p>{new Date(n.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationViewer;
