// ploggingService.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTrashBins = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.get(
    'https://k9b303.p.ssafy.io/api/plogging/trashBox',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data.map((bin: any) => ({
    ...bin,
    latitude: parseFloat(bin.latitude),
    longitude: parseFloat(bin.longitude),
  }));
};

export const plogginghistory = async (ploggingId: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.get(
    `https://k9b303.p.ssafy.io/api/plogging/${ploggingId}/finishMap`, // ploggingId를 동적으로 삽입
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data.map((bin: any) => ({
    ...bin,
    latitude: parseFloat(bin.latitude),
    longitude: parseFloat(bin.longitude),
  }));
};
