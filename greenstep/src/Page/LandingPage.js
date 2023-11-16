import React from 'react';
import './LandingPage.css'; // 스타일시트 임포트

export default function LandingPage() {
  return (
    <div className="landing-container">
      <video autoPlay loop muted className="background-video">
        <source src="/plogging1.mp4" type="video/mp4"/>
      </video>
      <div className="overlay-text1 overlay-text">플로깅</div>
      <div className="overlay-text1 overlay-text-sub">123</div>
      <div className="overlay-text2 overlay-text">집에</div>
      <div className="overlay-text2 overlay-text-sub">456</div>
      <div className="overlay-text3 overlay-text">가고싶다</div>
      <div className="overlay-text3 overlay-text-sub">789</div>
    </div>
  );
}