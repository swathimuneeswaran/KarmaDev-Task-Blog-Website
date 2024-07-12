import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./CreatePost.css"

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/posts', { title, content });

    navigate('/home');
  };

  return (
    <div className='blog_create_post'>
      <h1>Create Post</h1>
      <form className='form_create_post' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          rows={2}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
