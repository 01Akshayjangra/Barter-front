import React from 'react'
import "./css/Explore.css"
import Post from '../profile/Post'
import Spinner from '../miscelleneous/Spinner';
import Filters from '../miscelleneous/Filters';
import { useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';



const Explore = () => {

  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true); // set loading to true before the fetch request is initiated

    fetch('/api/post', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false); // set loading to false after the data is fetched
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <>
      <div className="explore__container">

        <div className="explore__carousel">
          <HeroCarousel/>
        </div>

        <Filters />

        <div style={{ textAlign: 'center', marginTop: '10px' }} >
          {loading && <Spinner />}
        </div>

        <div className="explore__postsContainer">
          {posts.map(post => (
            <Post postImage={post.image.url} postName={post.title} hearts={post.hearts} views={post.views} shares={post.shares} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Explore