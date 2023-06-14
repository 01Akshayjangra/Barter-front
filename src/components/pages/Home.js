import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../api/Api';
import Spinner from '../miscelleneous/Spinner';
import Post from '../profile/Post';
import Search from './Search';
import ChatLoading from '../chat/ChatLoading';
import { Footer } from './Footer';
import "./css/Home.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ChatState } from '../context/ChatProvider';
import ScrollTop from '../miscelleneous/ScrollTop';
import { LinearProgress } from '@mui/material';
import PostLoading from '../miscelleneous/PostLoading';
import Filters from '../miscelleneous/Filters';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { postSort, selectedCategory, postsLoading, setPostsLoading} = ChatState();

	const fetchPosts = async (page) => {
		try {
			setPostsLoading(true);
			const res = await axios.get(`${API_URL}/api/posts?page=${page}&category=${selectedCategory}&sort=${postSort}`);
			setPosts(res.data.posts);
			setCurrentPage(res.data.currentPage);
			setTotalPages(res.data.totalPages);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setPostsLoading(false);
		}
	};

	const goToNextPage = () => {
		const nextPage = currentPage + 1;
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		fetchPosts(nextPage);
	};

	const goToPreviousPage = () => {
		const previousPage = currentPage - 1;
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		fetchPosts(previousPage);
	};

	useEffect(() => {
		fetchPosts()
	}, [selectedCategory, postSort]);


	// if (loading) {
	// 	return <>
	// 		<LinearProgress />
	// 		<Spinner />
	// 	</>;
	// }

	return (
		<>
			<Search />
			<Filters/>

			{posts.length > 0 ? (
				<div className="home-posts-container">

					{posts.map((post) => (
						<Post
							key={post._id}
							post={post} />
					))}

				</div>
			) : (<div className="home-posts-container">
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
				<PostLoading />
			</div>
			)}


			<div className="home__pagination">
				{currentPage > 1 && (
					<div>
						<button className="home__paginationPrevious" onClick={goToPreviousPage}>
							<span>&#60;</span> Previous
						</button>
					</div>
				)}
				{currentPage < totalPages && (
					<div>
						<button className="home__paginationNext" onClick={goToNextPage}>
							Next <span>&#62;</span>
						</button>
					</div>
				)}
			</div>

			<Footer />
			<ScrollTop />
		</>
	);
};

export default Home;
