import React, {useState, useEffect} from 'react';
import {Marker, Polyline} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import trashBin from '../../Image/PloggingStart/trashBin.png'

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
        return require('../../Image/PloggingStart/trash.png');
      case 1:
        return require('../../Image/PloggingStart/pet.png');
      // 다른 타입에 대한 이미지 추가
      default:
        return require('../../Image/PloggingStart/pet.png'); // 기본 이미지
    }
  };
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
            <Image
              source={require('../../Image/PloggingStart/can.png')}
              style={{width: 50, height: 50}} // 원하는 스타일 지정
            />
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
      <TouchableOpacity onPress={toggleTrashBins} style={styles.trashBinImageContainer}>
        {/* <Text>쓰레기통 위치 토글</Text> */}
        <Image
        style={styles.trashBinImage}
        source={trashBin}
        />
      </TouchableOpacity>
    </>
  );
};

export default PloggingMap;

const styles = StyleSheet.create({
  trashBinImageContainer: {
    position: 'absolute',
    top: 200,
    left: 10,
    width: 40,
    height: 40,
  },
  trashBinImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});
