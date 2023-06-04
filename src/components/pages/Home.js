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
					<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7315641368329718"
						crossorigin="anonymous"></script>
					<ins class="adsbygoogle"
						style="display:block"
						data-ad-format="fluid"
						data-ad-layout-key="-7n+eo+1+2-5"
						data-ad-client="ca-pub-7315641368329718"
						data-ad-slot="3155542455"></ins>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({ });
					</script>
					<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7315641368329718"
						crossorigin="anonymous"></script>
					<ins class="adsbygoogle"
						style="display:block"
						data-ad-format="fluid"
						data-ad-layout-key="-7n+eo+1+2-5"
						data-ad-client="ca-pub-7315641368329718"
						data-ad-slot="3155542455"></ins>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({ });
					</script><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7315641368329718"
						crossorigin="anonymous"></script>
					<ins class="adsbygoogle"
						style="display:block"
						data-ad-format="fluid"
						data-ad-layout-key="-7n+eo+1+2-5"
						data-ad-client="ca-pub-7315641368329718"
						data-ad-slot="3155542455"></ins>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({ });
					</script>
					{posts.map(post => (
						<Post
							key={post._id}
							post={post} />
					))}
					<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7315641368329718"
						crossorigin="anonymous"></script>
					<ins class="adsbygoogle"
						style="display:block"
						data-ad-format="fluid"
						data-ad-layout-key="-7n+eo+1+2-5"
						data-ad-client="ca-pub-7315641368329718"
						data-ad-slot="3155542455"></ins>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({ });
					</script>
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