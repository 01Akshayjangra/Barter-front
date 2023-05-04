import React from 'react'
import "./css/Footer.css"

export const Footer = () => {
    return (
        <div class="Footer_main_box">


            <div class="Footer_content1">
                <h6>
                    Barter
                </h6>
                <p>
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                </p>
            </div>

            <div class="Footer_content2">
                <h2>Our Work </h2>

                <div className="Footer_Content_list">
                    <ol>
                        <li>
                            Explore
                        </li>
                        <li>
                            Blog
                        </li>
                        <li>
                            Learn
                        </li>
                    </ol>
                </div>
            </div>



            <div class="Footer_content3">
                <h2>Contact Us</h2>
                <form>
                    <div className="login__formContainer">
                        <h4 for="email">Email</h4>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email or username"
                            required />

                        <h4>Write Your Views</h4>
                        <input
                            type="text"
                            name="text"
                            placeholder="Write Here"
                            required />

                        <button type="submit" className="submitbtn">
                            Submit
                        </button>

                    </div>


                </form>
            </div>

            <div class="Footer_content4">

                <h2>Follow Us</h2>
                <div><a href="#" target="_blank"><i className="fa-brands fa-facebook" style={{ 'color': "blue" }} ></i></a>
                    <a href="#" target="_blank"> <i className="fa-brands fa-linkedin" style={{ 'color': "#0077B5" }}></i></a></div>
                <div>
                    <a href="#" target="_blank"><i className="fa-brands fa-youtube" style={{ 'color': "red" }}></i></a>
                    <a href="#" target="_blank"> <i className="fa-brands fa-twitter" style={{ 'color': `#1DA1F2` }}></i></a>
                </div>



            </div>

            <div class="Footer_last_content">
                © 2023 Copyright:
                <a class="text-white" href="#"
                >Barter</a
                >
            </div>


        </div>




    )
}
