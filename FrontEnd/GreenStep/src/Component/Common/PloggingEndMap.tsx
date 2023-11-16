import React, {useState, useEffect} from 'react';
import {Marker, Polyline} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {fetchTrashBins} from '../PloggingStart/api/ploggingService'; // 올바른 경로로 수정
import {getImageForTrashType} from '../PloggingStart/utils'; // 올바른 경로로 수정
import LoadingIndicator from '../PloggingStart/Loading';

interface ILocation {
  latitude: number;
  longitude: number;
}

interface TrashBin {
  latitude: number;
  longitude: number;
  type: number;
}

interface PloggingEndMapProps {
  locations: ILocation[];
}

const PloggingEndMap: React.FC<PloggingEndMapProps> = ({locations}) => {
  console.log(locations);
  const [trashBins, setTrashBins] = useState<TrashBin[]>([]);
  const [showTrashBins, setShowTrashBins] = useState<boolean>(false);

  useEffect(() => {
    const loadTrashBins = async () => {
      try {
        const bins = await fetchTrashBins();
        setTrashBins(bins);
      } catch (error) {
        console.error('Error fetching trash bins:', error);
      }
    };

    loadTrashBins();
  }, []);

  const toggleTrashBins = () => {
    setShowTrashBins(!showTrashBins);
  };
  if (locations.length === 0) {
    // 데이터가 로드되기를 기다리는 동안 로딩 인디케이터를 표시할 수 있습니다.
    return <LoadingIndicator />;
  }
  return (
    <>
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: locations[0]?.latitude || 0,
          longitude: locations[0]?.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0821,
        }}>
        {locations.length > 0 && (
          <Marker
            key={'start-point'}
            coordinate={{
              latitude: locations[0].latitude,
              longitude: locations[0].longitude,
            }}>
            <Image
              source={require('../../Image/PloggingStart/pet.png')} // 시작점 마커 이미지
              style={{width: 50, height: 50}}
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
                style={{width: 50, height: 50}}
              />
            </Marker>
          ))}
        {locations.length > 1 && (
          <Polyline
            coordinates={locations}
            strokeColor="#00FF00"
            strokeWidth={6}
          />
        )}
      </MapView>
      <TouchableOpacity onPress={toggleTrashBins} style={styles.button}>
        <Text>쓰레기통 위치 토글</Text>
      </TouchableOpacity>
    </>
  );
};

export default PloggingEndMap;
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
