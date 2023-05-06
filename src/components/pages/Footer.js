import React from 'react'
import "./css/Footer.css"
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <>
            <div className="Footer_main_box">


                <div className="Footer_content1">
                    <img
                        className="Footer_logo-img"
                        src="./images/barter.png"
                        alt=""
                        style={{ height: '30px' }}
                    />
                    <p>
                        Barter is a platform where creatives showcase their work and connect with clients worldwide. It aims to be the go-to destination for top-notch design and creativity while fostering collaboration and innovation among a global community of professionals.
                    </p>

                    <div className="Footer_content_icons">
                        <a href="#" target="_blank"><i className="fa-brands fa-facebook" style={{ 'color': "blue" }} ></i></a>
                        <a href="#" target="_blank"> <i className="fa-brands fa-linkedin" style={{ 'color': "#0077B5" }}></i></a>
                        <a href="#" target="_blank"><i className="fa-brands fa-youtube" style={{ 'color': "red" }}></i></a>
                        <a href="#" target="_blank"> <i className="fa-brands fa-twitter" style={{ 'color': `#1DA1F2` }}></i></a>
                    </div>
                </div>

                <div className="Footer_content2">
                    <h1>Our Work </h1>

                    <div className="Footer_Content_list">
                        <Link to="/explore">Explore</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/learn">Learn</Link>
                    </div>
                </div>



                <div className="Footer_content3">
                    <h1>Contact Us</h1>
                    <form>
                        <div className="login__formContainer">
                            <h4 for="email">Email</h4>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email adress"
                                required />

                            <h4>Write Your Views</h4>
                            <input
                                type="text"
                                name="text"
                                placeholder="Write Here"
                                required />
                            <br />
                            <button type="submit" className="submitbtn">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="Footer_last_content">
                <h3> © 2023 Copyright:
                    <a className="text-white" href="#">Barter</a></h3>
            </div>
        </>
    )
}
