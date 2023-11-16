import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
const containerStyle = {
  width: '100%',
  height: '100vh',
};

// 대전 지역의 중심 좌표
const center = {
  lat: 36.3504,
  lng: 127.3845,
};
const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

// const markersData = Array.from({ length: 103 }, (_, i) => ({
//   id: i + 1,
//   name: `장소 ${i + 1}`,
//   position: {
//     lat: center.lat + Math.random() * 0.1 - 0.05,
//     lng: center.lng + Math.random() * 0.1 - 0.05,
//   },
// }));

function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: mapApiKey,
    libraries: ['visualization'],
  });

  const [map, setMap] = useState(null);

  // 어두운 스타일 정의
// 어두운 스타일을 조금 밝게 조정
const modifiedDarkStyle = [
    { elementType: 'geometry', stylers: [{ color: '#2a2a2a' }] }, // 기하학적 요소 색상 조정
    { elementType: 'labels.text.stroke', stylers: [{ color: '#2a2a2a' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] }, // 텍스트 색상 조정
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#383838' }] // 도로 색상 조정
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }] // 도로 윤곽선 색상 조정
    },
    {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
    
      // 도로 윤곽선 스타일 조정
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }, { weight: 1 }] // 색상과 두께 조정
      },
    
   // 버스 정류장 숨기기
  {
    featureType: 'transit.station.bus',
    stylers: [{ visibility: 'off' }]
  },

  // 지하철 역 숨기기
  {
    featureType: 'transit.station.rail',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit.station.bus',
    stylers: [{ visibility: 'off' }]
  },
  ];
  
 
// 마커 데이터를 가져오는 함수
const [markersData, setMarkersData] = useState([]); // 마커 데이터 상태
useEffect(() => {
  axios.get('https://k9b303.p.ssafy.io/api/plogging/map') // API endpoint URL
    .then(response => {
      // API response extraction and state update
      console.log(response.data);
      setMarkersData(response.data.map(marker => ({
        ...marker,
        position: {
          lat: parseFloat(marker.latitude), // Convert string latitude to float
          lng: parseFloat(marker.longitude), // Convert string longitude to float
        },
        trashType: marker.trashType // Keeping the trashType as part of the marker data
      })));
    })
    .catch(error => {
      console.error('Error fetching marker data:', error);
    });
}, []);
  useEffect(() => {
    if (map && markersData.length > 0) {
    const heatmapData = markersData.map(
      (point) => new window.google.maps.LatLng(point.position.lat, point.position.lng)
    );

    const heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map,
    });


      // 히트맵 설정
      heatmap.set('gradient', [
        'rgba(0, 255, 0, 0)',
        'rgba(0, 255, 0, 1)',
        'rgba(144, 238, 144, 1)',
        'rgba(152, 251, 152, 1)',
        'rgba(143, 188, 143, 1)',
      ]);
      heatmap.set('radius', 10); // 반경을 10으로 조정
      heatmap.set('maxIntensity', 3); // 최대 강도를 3으로 조정
      heatmap.set('opacity', 0.6); // 투명도를 0.6으로 조정
      // 지도 스타일 설정
      map.setOptions({ styles: modifiedDarkStyle });
    }
  }, [map, markersData]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={map => setMap(map)}
      options={{disableDefaultUI: true}}
    />
  ) : <div>Loading...</div>;
}

export default MapPage;
