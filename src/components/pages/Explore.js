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
import ChatLoading from '../chat/ChatLoading';

const Explore = () => {

  const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { selectedCategory } = ChatState();

	const fetchPosts = async (page) => {
		try {
			setLoading(true);
			const res = await axios.get(`${API_URL}/api/posts?page=${page}&category=${selectedCategory}`);
			setPosts(res.data.posts);
			setCurrentPage(res.data.currentPage);
			setTotalPages(res.data.totalPages);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const goToNextPage = () => {
		const nextPage = currentPage + 1;
		fetchPosts(nextPage);
	};

	const goToPreviousPage = () => {
		const previousPage = currentPage - 1;
		fetchPosts(previousPage);
	};

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

        {posts.length > 0 ? (
				<div className="home-posts-container">

					{posts.map((post) => (
						<Post
							key={post._id}
							post={post} />
					))}

				</div>
			) : (
				<ChatLoading />
			)}


			<div className="home__pagination">
				{currentPage > 1 && (
					<div>
						<button className="home__paginationPrevious" onClick={goToPreviousPage}>
							&#60; Previous
						</button>
					</div>
				)}
				{currentPage < totalPages && (
					<div>
						<button className="home__paginationNext" onClick={goToNextPage}>
							Next &#62;
						</button>
					</div>
				)}
			</div>
      </div>
      <Footer />
    </>
  
  )
}

export default Explore
