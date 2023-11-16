import React from 'react';
import './DownLoadPage.css';

export default function DownLoadPage() {

  const handleCSVDownload = () => {
    window.location.href = 'https://3mm.s3.ap-northeast-2.amazonaws.com/%EC%93%B0%EB%A0%88%EA%B8%B0_%EB%8D%B0%EC%9D%B4%ED%84%B0.csv';
  }

  const handleAPKDownload = () => {
    window.location.href = 'https://3mm.s3.ap-northeast-2.amazonaws.com/app.apk';
  }

  return (
    <div className='download-page'>
      <div className="title-text">Green Step</div>
      <button className="rounded-button1" onClick={handleAPKDownload}>GreenStep 하러가기</button> 

      <button className="rounded-button2" onClick={handleCSVDownload}>CSV Data Download</button> 
    </div>
  );
}
