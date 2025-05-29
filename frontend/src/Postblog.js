import React, { useState } from 'react';
import axios from 'axios';

function PostBlog() {
  const [userId, setUserId] = useState('2'); // Default to User B
  const [content, setContent] = useState('');

  const postBlog = async () => {
    try {
      await axios.post('http://localhost:4000/api/post-blog', { userId, content });
      alert('Blog posted and followers notified!');
    } catch (err) {
      alert('Failed to post blog.');
    }
  };

  return (
    <div>
      <h2>Simulate Blog Post</h2>
      <input
        type="text"
        placeholder="Author ID (e.g., 2)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={postBlog}>Post Blog</button>
    </div>
  );
}

export default PostBlog;
