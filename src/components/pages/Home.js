import React from 'react'
import "./css/Home.css"
import Post from '../profile/Post'
import Search from './Search';
import Spinner from '../miscelleneous/Spinner';
import Filters from '../miscelleneous/Filters';
import { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';

const Home = () => {
	const [loading, setLoading] = useState();
	const [posts, setPosts] = useState([]);

	const {user} = ChatState();
	useEffect(() => {
		
		setLoading(true); //  set loading to true before the fetch request is initiated
	  
		fetch('/api/post', {
		  method: 'GET',
		  headers: { 'Content-Type': 'application/json' }
		})
		  .then(response => response.json())
		  .then(data => {
			setPosts(data);
			// console.log(data);
			setLoading(false); // set loading to false after the data is fetched
		  })
		  .catch(error => console.error(error));
	  }, []);

	return (
		<>
			<Search />
			<Filters/>
			
			<div style ={{textAlign: 'center', marginTop: '10px'}} >
				{loading && <Spinner />}
			</div>
			<div className="home-posts-container">

				{posts.map(post => (
					<Post postImage={post.image.url} postName={post.title} hearts={post.hearts} views={post.views} shares={post.shares} />
					))}

			</div>
		</>
	);
};

export default Home