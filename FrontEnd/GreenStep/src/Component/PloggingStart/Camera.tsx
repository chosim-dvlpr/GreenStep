import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

//훅
import {trashTypeMapping2} from './TrashType';
import {useTrashItem} from './Hook/useTrashItem';

//상태관리
import {useDispatch} from 'react-redux';
import {increment} from '../../Store/aiCountSlice';

//api
import {sendPhotoToServer} from './api/ploggingService';
const AiCamera = ({onClose}) => {
  const dispatch = useDispatch();
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const [permission, setPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');

  const addTrashItem = useTrashItem();

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    setPermission(cameraPermission === 'granted');
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const takePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({});
        setImageSource(photo.path);
        setShowCamera(false);
        const responseData = await sendPhotoToServer('file://' + photo.path);
        // 서버 응답 처리
        dispatch(increment());
        const name = trashTypeMapping2[responseData.predicted_class];
        addTrashItem(name);
      } catch (error) {
        console.error('Error taking photo', error);
      }
    }
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>카메라 권한을 확인하는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showCamera && device && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={takePhoto}
              style={styles.button}></TouchableOpacity>
          </View>
        </>
      )}
      {!showCamera && imageSource && (
        <View style={{flex: 1}}>
          <Image source={{uri: `file://${imageSource}`}} style={styles.image} />
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Image
              source={require('../../Image/PloggingStart/close.png')}
              style={{width: 50, height: 50}} // 원하는 스타일 지정
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,

    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AiCamera;
