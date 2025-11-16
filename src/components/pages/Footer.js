import React, { useState } from 'react'
import "./css/Footer.css"
import { Link } from 'react-router-dom'

export const Footer = () => {
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form submitted:', formData);
        setSubmitStatus('Thank you for reaching out! We will get back to you soon.');
        setFormData({ email: '', message: '' });
        
        setTimeout(() => setSubmitStatus(''), 4000);
    };

    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="footer-wrapper">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Company Info Section */}
                        <div className="footer-section footer-about">
                            <img
                                className="footer-logo"
                                src="./images/barter.png"
                                alt="Barter Logo"
                            />
                            <p className="footer-description">
                                Barter is a platform where creatives showcase their work and connect with clients worldwide. We foster collaboration and innovation among a global community of professionals.
                            </p>
                            <div className="footer-social">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-link">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div className="footer-section footer-links">
                            <h3 className="footer-heading">Quick Links</h3>
                            <nav className="footer-nav">
                                <Link to="/explore" className="footer-link">Explore Projects</Link>
                                <Link to="/blog" className="footer-link">Blog & Articles</Link>
                                <Link to="/learn" className="footer-link">Learn & Resources</Link>
                                <Link to="/about" className="footer-link">About Us</Link>
                                <Link to="/careers" className="footer-link">Careers</Link>
                            </nav>
                        </div>

                        {/* Contact Form Section */}
                        <div className="footer-section footer-contact">
                            <h3 className="footer-heading">Get In Touch</h3>
                            <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="footer-email" className="form-label">Email Address</label>
                                    <input
                                        id="footer-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@example.com"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="footer-message" className="form-label">Your Message</label>
                                    <textarea
                                        id="footer-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell us what's on your mind..."
                                        className="form-textarea"
                                        rows="4"
                                        required
                                    />
                                </div>
                                
                                <button type="submit" className="form-submit">
                                    Send Message
                                </button>
                                
                                {submitStatus && (
                                    <div className="submit-success">{submitStatus}</div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            © {currentYear} Barter. All rights reserved.
                        </p>
                        <div className="footer-bottom-links">
                            <Link to="/privacy" className="bottom-link">Privacy Policy</Link>
                            <span className="link-separator">•</span>
                            <Link to="/terms" className="bottom-link">Terms of Service</Link>
                            <span className="link-separator">•</span>
                            <Link to="/cookies" className="bottom-link">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}