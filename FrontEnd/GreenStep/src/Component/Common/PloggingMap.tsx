import React from 'react';
import {Marker, Polyline} from 'react-native-maps';
import MapView from 'react-native-map-clustering';

// 위치 객체에 대한 인터페이스 정의
interface ILocation {
  latitude: number;
  longitude: number;
}

// PloggingMap 컴포넌트가 받는 props에 대한 정의
interface PloggingMapProps {
  locations: ILocation[]; // 위치 객체의 배열
  isTracking: boolean; // 추적 활성화 여부를 나타내는 불리언
}
const PloggingMap: React.FC<PloggingMapProps> = ({locations, isTracking}) => {
  return (
    <MapView
      onMapReady={() => {
        console.log('Map is ready');
      }}
      style={{width: '100%', height: '100%'}}
      initialRegion={{
        latitude: locations[locations.length - 1].latitude,
        longitude: locations[locations.length - 1].longitude,
        latitudeDelta: 0.00022,
        longitudeDelta: 0.00221,
      }}>
      <Marker
        coordinate={{
          latitude: locations[locations.length - 1].latitude,
          longitude: locations[locations.length - 1].longitude,
        }}
      />
      {/* {trashBins.map((bin, index) => (
        <Marker key={index} coordinate={bin} />
      ))} */}
      {isTracking && locations.length > 0 && (
        <Polyline
          coordinates={locations}
          strokeColor="#00FF00"
          strokeWidth={3}
        />
      )}
    </MapView>
  );
};

export default PloggingMap;
