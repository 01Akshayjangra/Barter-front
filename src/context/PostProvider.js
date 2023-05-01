// import React, { createContext, useContext, useEffect, useState } from "react";

// const PostContext = createContext();

// const PostProvider = ({ children }) => {

//  const [posts, setPosts] = useState([]);
//  const [loading, setLoading] = useState();

// 	useEffect(() => {
// 		setLoading(true); //  set loading to true before the fetch request is initiated

// 		fetch('/api/post', {
// 			method: 'GET',
// 			headers: { 'Content-Type': 'application/json' }
// 		})
// 			.then(response => response.json())
// 			.then(data => {
// 				setPosts(data);
// 				// console.log(data);
// 				setLoading(false); // set loading to false after the data is fetched
// 			})
// 			.catch(error => console.error(error));
// 	}, []);



//   return (
//     <PostContext.Provider
//       value={{
//         posts
//       }}
//     >
//       {children}
//     </PostContext.Provider>
//   );
// };

// export const PostState = () => {
//   return useContext(PostContext);
// };

// export default PostProvider;
