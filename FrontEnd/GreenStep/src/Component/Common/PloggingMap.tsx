import React, {useState, useEffect} from 'react';
import {Marker, Polyline} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
interface ILocation {
  latitude: number;
  longitude: number;
}

interface TrashBin {
  latitude: number;
  longitude: number;
  type: number;
}

interface PloggingMapProps {
  locations: ILocation[];
  isTracking: boolean;
}

const PloggingMap: React.FC<PloggingMapProps> = ({locations, isTracking}) => {
  const [trashBins, setTrashBins] = useState<TrashBin[]>([]);
  const [showTrashBins, setShowTrashBins] = useState<boolean>(false);
  const getImageForTrashType = (type: number) => {
    switch (type) {
      case 0:
        return require('../../Image/PloggingStart/trashcan.png');
      case 1:
        return require('../../Image/PloggingStart/recycletrashcan.png');
      // 다른 타입에 대한 이미지 추가
      default:
        return require('../../Image/PloggingStart/pet.png'); // 기본 이미지
    }
  };

  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
            'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
          },
        };
        const res = await axios.get(
          'https://k9b303.p.ssafy.io/api/plogging/myAvatar',
          config,
        );
        console.log(res);
        setImageUri(res.data);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  // 이미지 사용

  useEffect(() => {
    const fetchTrashBins = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const res = await axios.get(
          'https://k9b303.p.ssafy.io/api/plogging/trashBox',
          config,
        );
        const bins = res.data.map((bin: any) => ({
          ...bin,
          latitude: parseFloat(bin.latitude),
          longitude: parseFloat(bin.longitude),
        }));
        console.log(bins);
        setTrashBins(bins);
      } catch (error) {
        console.error('Error fetching trash bins:', error);
      }
    };

    fetchTrashBins();
  }, []);

  const toggleTrashBins = () => {
    setShowTrashBins(!showTrashBins);
  };

  return (
    <>
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: locations[0].latitude,
          longitude: locations[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {locations.length > 0 && (
          <Marker
            key={locations.length - 1}
            coordinate={{
              latitude: locations[locations.length - 1].latitude,
              longitude: locations[locations.length - 1].longitude,
            }}>
            <Image source={{uri: imageUri}} style={{width: 50, height: 50}} />
          </Marker>
        )}
        {showTrashBins &&
          trashBins.map((bin, index) => (
            <Marker
              key={index}
              coordinate={{latitude: bin.latitude, longitude: bin.longitude}}>
              <Image
                source={getImageForTrashType(bin.type)}
                style={{width: 50, height: 50}} // 원하는 스타일 지정
              />
            </Marker>
          ))}
        {isTracking && locations.length > 1 && (
          <Polyline
            coordinates={locations}
            strokeColor="#00FF00"
            strokeWidth={6}
          />
        )}
      </MapView>
      <TouchableOpacity onPress={toggleTrashBins} style={styles.button}>
        <Image
          source={require('../../Image/PloggingStart/trashcanimg.png')}
          style={{width: 50, height: 50}} // 원하는 스타일 지정
        />
      </TouchableOpacity>
    </>
  );
};

export default PloggingMap;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 200,
    left: 10,
    width: 50, // TouchableOpacity의 크기를 이미지 크기에 맞게 조정
    height: 50,
    borderRadius: 5,
  },
});
