import React from 'react'
import "./css/Explore.css"
import Post from '../profile/Post'
import Spinner from '../miscelleneous/Spinner';
import Filters from '../miscelleneous/Filters';
import { useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import { Footer } from './Footer';
import API_URL from '../api/Api';

const Explore = () => {

  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState([]);
  const { selectedCategory } = ChatState();

  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get(`${API_URL}/api/posts?category=${selectedCategory}`);
    setLoading(false);
    setPosts(res.data);
  }

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory]);

  if (loading) {
    return <Spinner />;
  }
  
  return (
    <>
      <div className="explore__container">

        <div className="explore__carousel">
          <HeroCarousel />
          {/* <Filters /> */}
        </div>


        <div style={{ textAlign: 'center', marginTop: '10px' }} >
          {loading && <Spinner />}
        </div>

        <div className="explore__postsContainer">
          {posts.map(post => (
            <Post post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  
  )
}

export default Explore
