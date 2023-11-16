import React from 'react';
import './LandingPage.css'; // 스타일시트 임포트

export default function LandingPage() {
  return (
    <div className="landing-container">
      <video autoPlay loop muted className="background-video">
        <source src="/plogging1.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      <div className="overlay-text">Green   Step</div>
    </div>
  );
}