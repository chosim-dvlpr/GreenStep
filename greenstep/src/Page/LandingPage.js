import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LandingPage.css';

export default function LandingPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://k9b303.p.ssafy.io/api/main');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="landing-container">
      <video autoPlay loop muted className="background-video">
        <source src="/plogging1.mp4" type="video/mp4"/>
      </video>
      <div className="overlay-text1 overlay-text">time</div>
      <div className="overlay-text1 overlay-text-sub">{data.travelTime || 'Loading...'}</div>
      <div className="overlay-text2 overlay-text">range</div>
      <div className="overlay-text2 overlay-text-sub">{data.travelRange || 'Loading...'}</div>
      <div className="overlay-text3 overlay-text">trash</div>
      <div className="overlay-text3 overlay-text-sub">{data.trashAmount || 'Loading...'}</div>
    </div>
  );
}
