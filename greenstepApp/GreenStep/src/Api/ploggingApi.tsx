import {Double} from 'react-native/Libraries/Types/CodegenTypes';
import tokenHttp from './tokenHttp';

interface PloggingDataProps {
  travelTime: number;
  travelRange: Double;
  trashAmount: number;
  AITrashAmount: number;
  coorList: coorListProps;
  trashList: trashListProps;
}
interface coorListProps {
  longitude: Double;
  latitude: Double;
}
interface trashListProps {
  longitude: Double;
  latitude: Double;
  trash_picture: string;
  trash_type: number;
}

/** PLOGGING API */
export const PloggingAPI = {
  /** 플로깅 종료(시간, 거리, 갯수, AI, 위치, 쓰레기리스트(위도, 경도, 사진, 타입)) */
  postPloggingDataAxios: function (plogging: PloggingDataProps) {
    return tokenHttp.request({
      method: 'POST',
      url: '/plogging/end',
      data: plogging,
    });
  },
};
