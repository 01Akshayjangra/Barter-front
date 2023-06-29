import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
import Spinner from '../miscelleneous/Spinner';
import "./css/About.css"
import API_URL from '../api/Api';

const About = () => {
  const [loading, setLoading] = useState(true);
  const { user, aboutData, setAboutData } = ChatState()

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get(`${API_URL}/api/user/about`, config);
        const data = response.data;

        setAboutData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user about data:', error);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div class="about_main">
      {aboutData ? (

        <div class="about_section">
          
            <div>
              <h1>Name</h1>
              <p>{aboutData.firstname} {aboutData.lastname}</p>
            </div>
            <br />
            <div>
              <h1>Occupation</h1>
              <p>{aboutData.occupation}</p>
            </div>
            <br />
            <div>
              <h1>Company</h1>
              <p>{aboutData.company}</p>
            </div>
            <br />
            <div>
              <h1>Country</h1>
              <p>{aboutData.country}</p>
            </div>
            <br />
            <div>
              <h1>City</h1>
              <p>{aboutData.city}</p>
            </div>
              <br />
            <div>
              <h1>{aboutData.title}</h1>
              <p>{aboutData.description}</p>
            </div>
          </div>
          ) : (
          <p>No about data found.</p>
      )}
        </div>
      );
};

      export default About;
