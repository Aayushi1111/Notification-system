const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

let notifications = {
  '3': [
    {
      id: 1,
      userId: 3,
      message: 'You have a new follower!',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      userId: 3,
      message: 'Your post was liked!',
      timestamp: new Date().toISOString()
    }
  ]
};

// Get notifications for a user
app.get('/api/notifications/:id', (req, res) => {
  const userId = req.params.id;
  const userNotifications = notifications[userId];
  if (userNotifications) {
    res.json(userNotifications);
  } else {
    res.status(404).json({ error: 'No notifications found for this user.' });
  }
});

// Send a new notification
app.post('/api/notifications', (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: 'Missing userId or message' });
  }

  const newNotification = {
    id: Date.now(),
    userId,
    message,
    timestamp: new Date().toISOString()
  };

  if (!notifications[userId]) {
    notifications[userId] = [];
  }

  notifications[userId].push(newNotification);
  res.json({ success: true, notification: newNotification });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
