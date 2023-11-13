import React, {useState, useEffect} from 'react';
import {Marker, Polyline} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            }}
          />
        )}
        {showTrashBins &&
          trashBins.map((bin, index) => (
            <Marker
              key={index}
              coordinate={{latitude: bin.latitude, longitude: bin.longitude}}
              // 쓰레기통 타입에 따른 마커 아이콘 설정 가능
            />
          ))}
        {isTracking && locations.length > 1 && (
          <Polyline
            coordinates={locations}
            strokeColor="#00FF00"
            strokeWidth={3}
          />
        )}
      </MapView>
      <TouchableOpacity onPress={toggleTrashBins} style={styles.button}>
        <Text>쓰레기통 위치 토글</Text>
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
    width: 30,
    height: 30,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
});
