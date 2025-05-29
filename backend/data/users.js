// backend/data/users.js
const users = [
  { id: '1', name: 'User A' },
  { id: '2', name: 'User B' },
];

const followers = {
  '2': ['1'], // User B has follower User A
};

module.exports = { users, followers };
