import React from 'react'
import "./css/Home.css"
import Post from '../profile/Post'
import Search from './Search';
import Spinner from '../miscelleneous/Spinner';
import Filters from '../miscelleneous/Filters';
import { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import axios from "axios";
import ChatLoading from '../chat/ChatLoading';
import { Footer } from './Footer';
import API_URL from '../api/Api';

const Home = () => {
	const [loading, setLoading] = useState();
	const [posts, setPosts] = useState([]);

	const { user, selectedCategory } = ChatState();
	const [userInfo, setUserInfo] = useState([]);


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
			<Search />
			{/* <Filters /> */}

			<div style={{ textAlign: 'center', marginTop: '10px' }} >
				{loading && <Spinner />}
			</div>
			{posts ? (
				<div className="home-posts-container">
				
					{posts.map(post => (
						<Post
							key={post._id}
							post={post} />
					))}
					
				</div>
			) : (
				<ChatLoading />
			)
			}
			<Footer />
		</>
	);
};

export default Home