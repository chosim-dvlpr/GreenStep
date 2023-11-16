import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

// 대전 지역의 중심 좌표
const center = {
  lat: 36.3504,
  lng: 127.3845,
};

// 대전 주변에 마커 생성
const markersData = Array.from({ length: 103 }, (_, i) => ({
  id: i + 1,
  name: `장소 ${i + 1}`,
  position: {
    lat: center.lat + Math.random() * 0.1 - 0.05,
    lng: center.lng + Math.random() * 0.1 - 0.05,
  },
}));

function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "여기에_당신의_API_키",
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
    // 기타 스타일 규칙을 추가할 수 있습니다.
  ];
  
  // useEffect 내부의 지도 스타일 설정 부분을 변경
 

  useEffect(() => {
    if (map) {
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
  }, [map]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={map => setMap(map)}
    />
  ) : <div>Loading...</div>;
}

export default MapPage;
