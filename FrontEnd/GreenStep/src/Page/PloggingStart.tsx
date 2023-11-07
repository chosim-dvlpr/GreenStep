import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import React, {useState, useRef, useEffect, useReducer} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Marker, Polyline} from 'react-native-maps';
import styled from 'styled-components';
import {Platform, PermissionsAndroid} from 'react-native';
import {
  IState,
  locationReducer,
  initialState,
} from '../Component/PloggingStart/LocationReducer';
import MapView from 'react-native-map-clustering';
import PloggingInfo from '../Component/PloggingStart/PloggingInfo';
import PloggingFooter from '../Component/PloggingStart/PloggingFooter';
import PloggingMap from '../Component/Common/PloggingMap';
import PloggingModal from '../Component/PloggingStart/PloggingModal';
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

const PloggingStart = () => {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  const watchId = useRef(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  useEffect(() => {
    requestPermission().then(result => {
      if (result === 'granted') {
        watchId.current = Geolocation.watchPosition(
          position => {
            const {latitude, longitude} = position.coords;
            console.log(position.coords);
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

  // 모달
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <PloggingInfo
        isTracking={isTracking}
        setIsTracking={setIsTracking}
        distance={state.totalDist}
      />
      {state.locations.length > 0 && (
        <PloggingMap locations={state.locations} isTracking={isTracking} />
      )}

      <PloggingFooter openModal={openModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <PloggingModal onClose={closeModal} />
      </Modal>
    </View>
  );
};

export default PloggingStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// //쓰레기 통 로직 더미데이터
// function generateTrashBins(center, count) {
//   const trashBins = [];
//   const radius = 0.01; // 약 1km 반경

//   for (let i = 0; i < count; i++) {
//     const randomLatitudeOffset = (Math.random() - 0.5) * 2 * radius;
//     const randomLongitudeOffset = (Math.random() - 0.5) * 2 * radius;

//     const newLatitude = center.latitude + randomLatitudeOffset;
//     const newLongitude = center.longitude + randomLongitudeOffset;

//     trashBins.push({latitude: newLatitude, longitude: newLongitude});
//   }

//   return trashBins;
// }

// const centerTrashBin = {latitude: 36.3456, longitude: 127.2985};
// const trashBins = generateTrashBins(centerTrashBin, 50);

// interface ILocation {
//   latitude: number;
//   longitude: number;
// }

// interface IState {
//   locations: ILocation[];
//   totalDist: number;
// }
// type LocationAction = {type: 'ADD_LOCATION'; payload: ILocation};
// // 필요한 다른 액션 타입들을 여기에 추가할 수 있습니다.

// const initialState = {
//   locations: [],
//   totalDist: 0,
// };

// //거리 계산 상태관리
// const locationReducer = (state: IState, action: LocationAction): IState => {
//   switch (action.type) {
//     case 'ADD_LOCATION':
//       const newLocation = action.payload;
//       const prevLocation = state.locations[state.locations.length - 1];
//       const distance =
//         state.locations.length > 0
//           ? haversine(prevLocation, newLocation, {unit: 'meter'})
//           : 0;
//       const updatedTotalDist = state.totalDist + distance;
//       console.log('Total Distance:', updatedTotalDist); // 여기에서 거리를 출력
//       return {
//         locations: [...state.locations, newLocation],
//         totalDist: updatedTotalDist,
//       };
//     default:
//       return state;
//   }
// };
