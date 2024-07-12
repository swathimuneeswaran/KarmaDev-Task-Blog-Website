import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/posts?page=${currentPage}`);
      setPosts(res.data.posts);
      setPageCount(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching posts:', err);
      
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);

      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className='home_blog'>
      <h1>Blog Posts</h1>
      <h2 style={{marginLeft:"50px",color:"white",fontStyle:"italic"}}>To Create a New Blog</h2><br />
      <button className='create_blog'><Link style={{ textDecoration:"none",color:"pink"}} to="/create">Create New Post</Link></button>
      <div className="box_blog">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className='card' key={post._id}>
              <h2 className='btn-shine'>{post.title}</h2>
              <p>{post.content}</p>
              <div className='buttons_edit_delete'>
                <button><Link style={{textDecoration:"none",color:"black"}} to={`/edit/${post._id}`}>Edit</Link></button>
                <button className="delete_button" onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{fontSize:"40px",fontFamily:"sans-serif"}}>No posts available</p>
        )}
      </div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        style={{ color:"black" }}
      />
    </div>
  );
};

export default Home;
