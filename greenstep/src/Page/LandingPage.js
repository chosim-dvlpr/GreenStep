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
      <div className="overlay-text1 overlay-text-top" style={{ top: "63.5%" }}><img className='imagesize' src="/icon/time.gif" alt="time"/></div>
      <div className="overlay-text1 overlay-text">{data.travelTime ? (data.travelTime.toString().length > 3 ? 
                                                    data.travelTime.toLocaleString() : data.travelTime) : 'Loading...'}</div>
      <div className="overlay-text1 overlay-text-sub">
        <div className='inlineBlock point'>Hour</div>
        <div className='inlineBlock'>&nbsp;of </div>
        <div className='inlineBlock'> &nbsp;Green</div>
        <div className='inlineBlock'>Step</div>
      </div>

      <div className="overlay-text2 overlay-text-top"><img className='imagesize' src="/icon/walking.png" alt="walking"/></div>
      <div className="overlay-text2 overlay-text">{data.travelRange ? (data.travelRange.toFixed(0).length > 3 ? Number(data.travelRange.toFixed(0)).toLocaleString() 
                                                    : data.travelRange.toFixed(0)) : 'Loading...'}</div>
      <div className="overlay-text2 overlay-text-sub">
        <div className='inlineBlock point'>KM</div>
        <div className='inlineBlock'>&nbsp;of </div>
        <div className='inlineBlock'> &nbsp;Green</div>
        <div className='inlineBlock'>Step</div>
      </div>

      <div className="overlay-text3 overlay-text-top"><img className='imagesize2' src="/icon/trash.png" alt="trash"/></div>
      <div className="overlay-text3 overlay-text">{data.trashAmount ? (data.trashAmount.toString().length > 3 ? 
                                                    data.trashAmount.toLocaleString() : data.trashAmount) : 'Loading...'}</div>
      <div className="overlay-text3 overlay-text-sub">
        <div className='inlineBlock point'>Trash</div>
        <div className='inlineBlock'>&nbsp;of </div>
        <div className='inlineBlock'> &nbsp;Green</div>
        <div className='inlineBlock'>Step</div>
      </div>
    </div>
  );
}
