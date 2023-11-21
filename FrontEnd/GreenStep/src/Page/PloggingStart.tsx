import React, {useState, useRef, useEffect, useReducer} from 'react';
import {View, StyleSheet, Modal} from 'react-native';

// 지도
import Geolocation from 'react-native-geolocation-service';
import {requestPermission} from '../Component/PloggingStart/MapPermission';

//상태관리
import {
  locationReducer,
  initialState,
} from '../Component/PloggingStart/LocationReducer';

//컴포넌트
import PloggingInfo from '../Component/PloggingStart/PloggingInfo';
import PloggingFooter from '../Component/PloggingStart/PloggingFooter';
import PloggingMap from '../Component/Common/PloggingMap';
import PloggingModal from '../Component/PloggingStart/PloggingModal';
import useModal from '../Component/PloggingStart/Hook/useModal';

const PloggingStart = () => {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  const watchId = useRef(null);
  const [isTracking, setIsTracking] = useState(false);

  // requestPermission 허가 있으면, 실시간 위치 추적, lcoation reducer에서 상태관리
  useEffect(() => {
    requestPermission().then(result => {
      if (result) {
        watchId.current = Geolocation.watchPosition(
          position => {
            const {latitude, longitude} = position.coords;
            if (isTracking) {
              dispatch({type: 'ADD_LOCATION', payload: {latitude, longitude}});
            } else {
              dispatch({
                type: 'UPDATE_CURRENT_LOCATION',
                payload: {latitude, longitude},
              });
            }
          },
          error => console.log(error),
          {enableHighAccuracy: true, distanceFilter: 10},
        );
      }
    });

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [isTracking]);

  // 시작 버튼 누를시
  const handleStartTracking = () => {
    setIsTracking(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch({
          type: 'RESET_AND_ADD_LOCATION',
          payload: {latitude, longitude},
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );
  };
  // 모달 창 상태
  const {isModalVisible, openModal, closeModal} = useModal();

  return (
    <View style={styles.container}>
      <PloggingInfo
        isTracking={isTracking}
        handlestart={handleStartTracking}
        distance={state.totalDist}
        locations={state.locations}
        setIsTracking={setIsTracking}
      />

      {state.locations.length > 0 && (
        <PloggingMap
          style={styles.ploggingMap}
          locations={state.locations}
          isTracking={isTracking}
        />
      )}

      <PloggingFooter openModal={openModal} isTracking={isTracking} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <PloggingModal onClose={closeModal} isTracking={isTracking} />
      </Modal>
    </View>
  );
};

export default PloggingStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'black',
  },
  ploggingInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 800,
    zIndex: 1,
  },
  ploggingMap: {
    flex: 1,
    zIndex: 0,
  },
});
