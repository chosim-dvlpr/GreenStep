import {View, Text} from 'react-native';
import React, {useState, useRef, useEffect, useReducer} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Marker, Polyline} from 'react-native-maps';
import styled from 'styled-components';
import {Platform, PermissionsAndroid} from 'react-native';
import haversine from 'haversine';
import MapView from 'react-native-map-clustering';

//안드로이드에서 권한 갖고오기
async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

interface ILocation {
  latitude: number;
  longitude: number;
}

const initialState = {
  locations: [],
  totalDist: 0,
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      const newLocation = action.payload;
      const prevLocation = state.locations[state.locations.length - 1];
      const distance =
        state.locations.length > 0
          ? haversine(prevLocation, newLocation, {unit: 'meter'})
          : 0;
      const updatedTotalDist = state.totalDist + distance;
      console.log('Total Distance:', updatedTotalDist); // 여기에서 거리를 출력
      return {
        locations: [...state.locations, newLocation],
        totalDist: updatedTotalDist,
      };
    default:
      return state;
  }
};

const PloggingStart = () => {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  const watchId = useRef(null);

  function generateTrashBins(center, count) {
    const trashBins = [];
    const radius = 0.01; // 약 1km 반경

    for (let i = 0; i < count; i++) {
      const randomLatitudeOffset = (Math.random() - 0.5) * 2 * radius;
      const randomLongitudeOffset = (Math.random() - 0.5) * 2 * radius;

      const newLatitude = center.latitude + randomLatitudeOffset;
      const newLongitude = center.longitude + randomLongitudeOffset;

      trashBins.push({latitude: newLatitude, longitude: newLongitude});
    }

    return trashBins;
  }

  const centerTrashBin = {latitude: 36.3456, longitude: 127.2985};
  const trashBins = generateTrashBins(centerTrashBin, 50);
  useEffect(() => {
    requestPermission().then(result => {
      if (result === 'granted') {
        watchId.current = Geolocation.watchPosition(
          position => {
            const {latitude, longitude} = position.coords;
            dispatch({type: 'ADD_LOCATION', payload: {latitude, longitude}});
          },
          error => {
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10,
            interval: 5000,
            fastestInterval: 2000,
          },
        );
      }
    });
  }, []);

  // 새로운 useEffect를 추가하여 거리를 콘솔에 출력
  useEffect(() => {
    console.log('Total Distance:', state.totalDist);
  }, [state.totalDist]);

  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  return (
    <Container>
      {/* <StopWatch />
      <DistanceDisplay distance={state.totalDist} /> */}
      {state.locations.length > 0 && (
        <MapView
          onMapReady={() => {
            console.log('Map is ready');
          }}
          style={{flex: 1}}
          initialRegion={{
            latitude: state.locations[0].latitude,
            longitude: state.locations[0].longitude,
            latitudeDelta: 0.00022,
            longitudeDelta: 0.00221,
          }}>
          {trashBins.map((bin, index) => (
            <Marker key={index} coordinate={bin} />
          ))}
          <Polyline
            coordinates={state.locations}
            strokeColor="#00FF00"
            strokeWidth={3}
          />
        </MapView>
      )}
    </Container>
  );
};

export default PloggingStart;

const Container = styled.View`
  flex: 1;
`;
