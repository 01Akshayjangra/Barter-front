import React from 'react'
import HeroCarousel from './HeroCarousel'
import "./css/Search.css"
const Search = () => {
    return (
        <div className="search-mainContainer">

            <div className="search-container">

                <div className="search-category">

                    <HeroCarousel />

                </div>

                <div className="hero-media" id="hero-media">
                    <video data-src-lg="https://cdn.dribbble.com/uploads/39534/original/32eb117875f793069fb53fa6a67aa5dc.mp4?1657913912" data-src-sm="https://cdn.dribbble.com/uploads/39535/original/009d9a82575ae2dd099987bd72f5b093.mp4?1657913923" src="https://cdn.dribbble.com/uploads/39534/original/32eb117875f793069fb53fa6a67aa5dc.mp4?1657913912" className="back-video hero-media-asset is-hidden is-visible" autoPlay muted loop></video>
                </div>

                <div className="text-content hero-text-content">
                    <h1 className="hero-text-content-h1">Discover the Best Design Portfolios<br/> from Around the World</h1>
                    <h2 className="hero-text-content-h2 font-body margin-v-16">Discover Top-notch Design and Creativity from Leading Professionals Worldwide on <br/>Barter - the Premier Showcase for Design Portfolios and Agencies</h2>
                </div>

                <div className="search-component">
                    <div>
                        <input type="text" placeholder='Search' />
                    </div>
                    <div className="search-icon">
                        <i className="fa-solid fa-magnifying-glass" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Search
