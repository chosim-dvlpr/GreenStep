// MapPermission.ts
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('always');
    return auth === 'granted'; // 'granted' 문자열을 boolean 값으로 변환
  }

  if (Platform.OS === 'android') {
    const auth = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return auth === PermissionsAndroid.RESULTS.GRANTED; // PermissionsAndroid.RESULTS.GRANTED 상수를 boolean 값으로 변환
  }

  return false;
};
