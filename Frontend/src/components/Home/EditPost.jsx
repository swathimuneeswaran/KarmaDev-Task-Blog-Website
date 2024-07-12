import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/posts/${id}`, { title, content });
    navigate('/home');
  };

  return (
    <div className='blog_create_post' >
      <h1>Edit Post</h1>
      <form  className='form_create_post' style={{backgroundColor:"gray"}} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
