import React from 'react'
import "./css/Explore.css"
import Post from '../profile/Post'
import Spinner from '../miscelleneous/Spinner';
import Filters from '../miscelleneous/Filters';
import { useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
const Explore = () => {

  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState([]);
  const { selectedCategory } = ChatState();
  // useEffect(() => {
  //   setLoading(true); // set loading to true before the fetch request is initiated

  //   fetch('/api/post', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setPosts(data);
  //       setLoading(false); // set loading to false after the data is fetched
  //     })
  //     .catch(error => console.error(error));
  // }, []);


  const fetchPosts = async () => {
    const res = await axios.get(`https://barter-backend.onrender.com/api/posts?category=${selectedCategory}`);
    setPosts(res.data);
  }

  useEffect(() => {
    setLoading(true);
    fetchPosts()
    setLoading(false);
  }, [fetchPosts]);

  return (
    <>
      <div className="explore__container">

        <div className="explore__carousel">
          <HeroCarousel />
        </div>

        <Filters />

        <div style={{ textAlign: 'center', marginTop: '10px' }} >
          {loading && <Spinner />}
        </div>

        <div className="explore__postsContainer">
          {posts.map(post => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Explore
