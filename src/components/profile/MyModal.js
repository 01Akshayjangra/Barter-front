import React, { useState } from 'react'
import "./css/Modal.css"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import Post from '../profile/Post'
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';


const MyModal = (props) => {
    const { post, closeModal } = props;
    const { user } = ChatState();

    const [posts, setPosts] = useState([
        {
            "image": {
                "public_id": "allPosts/fegaaexfjvhsxu6g3rsu",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1682958497/allPosts/fegaaexfjvhsxu6g3rsu.webp"
            },
            "_id": "644fe8a2997161793724a878",
            "title": "NFT puppy dog",
            "description": "NAN",
            "tags": [
                "silly",
                "outline",
                "friendly",
                "animal",
                "sweet",
                "kawaii",
                "cute",
                "metaverse",
                "artwork",
                "generative",
                "art",
                "character",
                "funny",
                "mascot",
                "cartoon",
                "flat",
                "illustration",
                "puppy",
                "dog",
                "nfts",
                "nft"
            ],
            "tools": [
                "Procreate",
                "Adobe Illustrator"
            ],
            "category": [
                "Illustration",
                "Graphic Design"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "644fa108b90a16c02fbc4553",
                "name": "kushal rana",
                "email": "kushalrana@gmail.com",
                "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/v8lqxjszdswnpypuwcok",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1682958694/allPosts/v8lqxjszdswnpypuwcok.webp"
            },
            "_id": "644fe967997161793724a87d",
            "title": "Grizzlython Badges",
            "description": "Some badges for the Solana Grizzlython website! Another fun technique used to get these grungy hand drawn illustrations. Brother Bo came in clutch with some help on these ",
            "tags": [
                "illustration",
                "graphic design",
                "vector",
                "figma",
                "design",
                "procreate",
                "digitalart"
            ],
            "tools": [
                "Adobe Illustrator",
                "Procreate"
            ],
            "category": [
                "Illustration",
                "Branding"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "644fa108b90a16c02fbc4553",
                "name": "kushal rana",
                "email": "kushalrana@gmail.com",
                "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/g2327wy4vbtkf2pceilc",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1682959266/allPosts/g2327wy4vbtkf2pceilc.webp"
            },
            "_id": "644feba2997161793724a882",
            "title": "Millennials",
            "description": "Digital nomad, freelancer, job hopper, globetrotter, confident, trendy, consumer, diversity, feedback searching - can you recognise yourself as Millennials generation Y",
            "tags": [
                "freelance",
                "freelnacer",
                "generation",
                "nomad",
                "job",
                "globetrotter",
                "design",
                "icons",
                "flat",
                "selfie",
                "icon",
                "loyal",
                "diversity",
                "hipster",
                "millennial"
            ],
            "tools": [
                "Adobe Illustrator"
            ],
            "category": [
                "Illustration"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "644fa108b90a16c02fbc4553",
                "name": "kushal rana",
                "email": "kushalrana@gmail.com",
                "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/no5mhswmwd2df6n7xyuq",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1683001426/allPosts/no5mhswmwd2df6n7xyuq.webp"
            },
            "_id": "64509053b93993f6189c69ba",
            "title": "Advertising Illustration for Canadian Energy Centre",
            "description": "Advertising Illustration for Canadian Energy Centre",
            "tags": [
                "canada",
                "woods",
                "cabin",
                "dark",
                "night",
                "ow",
                "l nature",
                "enviroment",
                "fire",
                "forest",
                "monotone",
                "red",
                "design",
                "photoshop",
                "character",
                "texture",
                "procreate",
                "2d",
                "illustration"
            ],
            "tools": [
                "Adobe Illustrator"
            ],
            "category": [
                "Illustration"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "64500197997161793724a8c6",
                "name": "sonu",
                "email": "sonukumar123@gmail.com",
                "pic": "https://images.unsplash.com/photo-1682784109052-aa092d1804d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/qqhtuub5hxwu6meduee3",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1683001646/allPosts/qqhtuub5hxwu6meduee3.webp"
            },
            "_id": "6450912eb93993f6189c69bd",
            "title": "Illustration system for Ecom3K",
            "description": "Ecom3K helps you own your Amazon data to grow a profitable business. This is a service that in 90 seconds creates custom dashboards based on your Amazon data. The illustration system includes 13 web illustrations, and was decided to combine the classic \"kapustin\" style with an isometric perspective.",
            "tags": [
                "system",
                "set",
                "black white",
                "linear",
                "case study",
                "commercial",
                "isometric",
                "outline",
                "2d",
                "kapustin",
                "digital",
                "vector",
                "design",
                "illustration",
                "optimization",
                "inventory",
                "coin",
                "money",
                "paid"
            ],
            "tools": [
                "Adobe Illustrator",
                "Adobe After Effects"
            ],
            "category": [
                "Illustration",
                "Graphic Design"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "64500197997161793724a8c6",
                "name": "sonu",
                "email": "sonukumar123@gmail.com",
                "pic": "https://images.unsplash.com/photo-1682784109052-aa092d1804d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/pgdqxztgtr5nfgujmb51",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1683001847/allPosts/pgdqxztgtr5nfgujmb51.webp"
            },
            "_id": "645091f7b93993f6189c69c0",
            "title": "Edgy - 15 Gradient Icons",
            "description": "I'm super excited to share my 15 newly-designed icons with you today. These are some of my earliest designs, and I've given them a fresh look with cool gradient colors and other minor tweaks. ✨",
            "tags": [
                "open source",
                "line icon",
                "icons",
                "iconography",
                "icon set",
                "icon pack",
                "icon design",
                "gradient",
                "free",
                "figma"
            ],
            "tools": [
                "Adobe Illustrator"
            ],
            "category": [
                "Illustration"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "64500197997161793724a8c6",
                "name": "sonu",
                "email": "sonukumar123@gmail.com",
                "pic": "https://images.unsplash.com/photo-1682784109052-aa092d1804d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/tanlnncuifvj0d1q2x29",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1683003073/allPosts/tanlnncuifvj0d1q2x29.webp"
            },
            "_id": "645096c1b93993f6189c69c6",
            "title": "Zodiac Illustration Set on Canva!  Check it out https://bit.ly/42eIrzB  Let me know if you have any requests or anything.",
            "description": "Zodiac Illustration Set on Canva!  Check it out https://bit.ly/42eIrzB  Let me know if you have any requests or anything.",
            "tags": [
                "gemini",
                "pisces",
                "icons",
                "astrology",
                "horoscope",
                "elements",
                "canva",
                "illustration",
                "zodiac"
            ],
            "tools": [
                "Adobe Illustrator",
                "Procreate"
            ],
            "category": [
                "Illustration"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "64500197997161793724a8c6",
                "name": "sonu",
                "email": "sonukumar123@gmail.com",
                "pic": "https://images.unsplash.com/photo-1682784109052-aa092d1804d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/crbuedjqabi9jl5yg02a",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1683017521/allPosts/crbuedjqabi9jl5yg02a.webp"
            },
            "_id": "6450cf316edf6002058d3878",
            "title": "W for Wegrow #36daysoftype",
            "description": "Introducing the letter W for #36daysoftype, inspired by growth & evolution! The concept features an abstract W crafted with circles of varying thickness, growing bolder from left to right to evoke a sense of movement & progression.  What are your thoughts on this design? 💭✨",
            "tags": [
                "color",
                "timeless",
                "modern",
                "web3",
                "icon",
                "mark",
                "letter",
                "abstract",
                "negative space",
                "circles",
                "progression",
                "evolution",
                "growth",
                "grow",
                "we",
                "w",
                "logo"
            ],
            "tools": [
                "Adobe Illustrator",
                "Procreate"
            ],
            "category": [
                "Illustration",
                "Branding"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "64509a6ab93993f6189c69da",
                "name": "Kushal thakur",
                "email": "kushalthakur123@gmail.com",
                "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/hq7pzhs3kjnmqmsjbla3",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1683017780/allPosts/hq7pzhs3kjnmqmsjbla3.webp"
            },
            "_id": "6450d0346edf6002058d387c",
            "title": "Medica Health App Character 🫀",
            "description": "Hi Guys! 🫀 Today exploration is about making illustration for heath care app i named Medica. From the latest exploration i add character for help to guide us in the app. Like Doctor character, Nurse, Medical Assistant and Pharmacy here.  I also attach the sketch below.",
            "tags": [
                "injection",
                "pharmacy",
                "doctor",
                "nurse",
                "medical",
                "ambulance",
                "heart",
                "surgical",
                "receipt",
                "medicine",
                "medical",
                "hospital",
                "health",
                "illustration",
                "set",
                "people",
                "character",
                "man",
                "avatar",
                "branding",
                "character",
                "illustration"
            ],
            "tools": [
                "Adobe Illustrator",
                "CorelDRAW"
            ],
            "category": [
                "Branding",
                "Illustration"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "64509a6ab93993f6189c69da",
                "name": "Kushal thakur",
                "email": "kushalthakur123@gmail.com",
                "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/iovlaeyfkxarysyookp9",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1683019320/allPosts/iovlaeyfkxarysyookp9.webp"
            },
            "_id": "6450d6396edf6002058d38a3",
            "title": "Golf logo",
            "description": " This is a Combination of Letter F and P in bold, sans-serif font, This is mainly P shape , I added Golf icon as Letter F, The letters are colored in a deep Orenge to creating a sense of sophistication and professionalism.  The use of the golf bat as an icon immediately conveys a sense of sportiness and athleticism, making it clear that the logo is associated with the sport of golf. Let me know what do you think!",
            "tags": [
                "letter",
                "colorful logo",
                "design",
                "vector",
                "app icon logo",
                "brand identity",
                "branding",
                "minimalist logo",
                "modern logo",
                "sports logo",
                "golf logo",
                "logo design",
                "logo"
            ],
            "tools": [
                "Adobe Illustrator"
            ],
            "category": [
                "Graphic Design",
                "Branding",
                "Illustration"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "64509a6ab93993f6189c69da",
                "name": "Kushal thakur",
                "email": "kushalthakur123@gmail.com",
                "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            },
            "__v": 0
        },
        {
            "image": {
                "public_id": "allPosts/ziz5ghpjpchmsbswwsz8",
                "url": "https://res.cloudinary.com/dahj17ckh/image/upload/v1683192690/allPosts/ziz5ghpjpchmsbswwsz8.jpg"
            },
            "_id": "64537b7112f05d14266f3541",
            "title": "Beauty Giselle Font",
            "description": "Beauty Giselle is a special modern style font. Made with accurate accuracy with beautiful curves. It is perfect for branding design, logos, greeting cards, title packaging. and other designs. Immediately use our fonts to make your work even more amazing.",
            "tags": [
                "font",
                "fonts",
                "typography",
                "type",
                "lettering",
                "logo",
                "typeface",
                "calligraphy",
                "sans serif",
                "font family",
                "sans serif font",
                "display font",
                "script",
                "display",
                "typedesign",
                "serif font",
                "serif",
                "sans serif typeface",
                "hand",
                "lettering",
                "handlettering"
            ],
            "tools": [
                "Adobe Illustrator",
                "Procreate"
            ],
            "category": [
                "Illustration",
                "Typography"
            ],
            "hearts": 0,
            "views": 0,
            "shares": 0,
            "userId": {
                "_id": "64509a6ab93993f6189c69da",
                "name": "Kushal thakur",
                "email": "kushalthakur123@gmail.com",
                "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            },
            "__v": 0
        }
    ]);
    console.log(post.userId._id)
    const followUser = async (userId, token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        try {
            const res = await axios.post(`/api/user/follow`, post.userId._id, config);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    // Unfollow a user
    const unfollowUser = async (userId, token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        try {
            const res = await axios.post(`/api/user/unfollow/${post.userId._id}`, config);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    return (
        <>
            <div className='popup__wrapper' onClick={closeModal}></div>

            <div className="modal__rightContent">
                <i className='fa-sharp fa-solid fa-xmark' onClick={closeModal} />

                <div className="modal__item">
                    <IconButton className='modal__itemIcon'>
                        <Link to='/explore'><Avatar src={post.userId.pic} /></Link>
                    </IconButton>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-regular fa-heart" />
                    </IconButton>
                    <span>{post.hearts}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-sharp fa-solid fa-eye" />
                    </IconButton>
                    <span>{post.views}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-solid fa-share" />
                    </IconButton>
                    <span>{post.shares}</span>
                </div>
            </div>
            <div className='popup__container'>

                <div className='modal__Main ModalScrollbar'>
                    <div className="modal__header">
                        <Link to='/explore'><Avatar src={post.userId.pic} /></Link>
                        <div className='modal__headerInfo'>
                            <h1>{post.userId.name}</h1>
                            <p onClick={followUser}>Follow</p>
                            <p onClick={unfollowUser} >unFollow</p>
                        </div>
                    </div>
                    <div className="modal__bodyMain">
                        <div className="modal__body">
                            <div className='modal__bodyTitle'>
                                {/* <h1>Title</h1> */}
                                <p>{post.title}</p>
                            </div>
                        </div>
                        <div className="modal__body">
                            <img src={post.image.url} alt="" />
                        </div>
                        <div className="modal__body">
                            <div className='modal__bodyDes'>
                                {/* <h1>Description</h1> */}
                                <p>{post.description}</p>
                            </div>
                        </div>
                        <div class="modal_tools"> <h4>Tools Used -  {post.tools}</h4>
</div>
                        {/* {post.tags} */}
                        
                        <div className="modal__body">
                            <div className='modal__bodyPostMain'>

                                <h1>More by {post.userId}</h1>
                                <button>View Profile</button>
                                <div className='modal__bodyPosts'>

                                    {posts.map(post => (
                                        <Post
                                            key={post._id}
                                            post={post} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal__body">
                            <div className='modal__bodyPostMain'>

                                <h1>More Like This ...</h1>
                                <div className='modal__bodyPosts'>

                                    {posts.map(post => (
                                        <Post
                                            key={post._id}
                                            post={post} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>/
                </div>

            </div>

        </>
    )
}

export default MyModal