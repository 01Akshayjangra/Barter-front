import React from 'react'
import "./css/Blog.css"
import axios from 'axios';
// import Navbar from './Navbar'

const Blog = () => {

const getRecommendations = async (postId) => {
  try {
    const response = await axios.post('https://barter-api.onrender.com/recommend', { postId });
    const recommendations = response.data;
    console.log("recommendations",recommendations);
  } catch (error) {
    console.error(error.message);
  }
};

const postId = '6455f7c678845af3f5053cb5';
getRecommendations(postId);

  return (
    <>
        {/* <Navbar/> */}
        <div className="blog-container">
          <div className="blog">
            <h1>Blog's <span>Section</span></h1>
            <h2>Looking for Blog Section!</h2>
            <p>We are building that page.</p>
            <p>We will coming soon with our Blog Page.</p>
          </div>
        </div>
    </>
  )
}

export default Blog
