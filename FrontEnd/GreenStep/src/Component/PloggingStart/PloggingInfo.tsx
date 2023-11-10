import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import StopWatch from './StopWatch';
import styled from 'styled-components/native';
import startImage from '../../Image/PloggingStart/play.png';
import stopImage from '../../Image/PloggingStart/stop.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {PloggingAPI} from '../../Api/ploggingApi';
import {Double} from 'react-native/Libraries/Types/CodegenTypes';
import {useDispatch} from 'react-redux';
import {resetCounts} from '../../Store/ploggingSlice';
type PloggingInfoProps = {
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
  distance: number;
  locations: any;
};

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

const PloggingInfo: React.FC<PloggingInfoProps> = ({
  isTracking,
  setIsTracking,
  distance,
  locations,
}) => {
  const dispatch = useDispatch();
  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
  };
  const handleLongPress = () => {
    setIsTracking(false);

    const travelRange = distance;

    console.log(trashListProps);
    const ploggingDataInfo = {
      travelTime: 100000,
      travelRange: travelRange,
      trashAmount: counts.쓰레기,
      AITrashAmount: 0,
      coorList: locations,
      trashList: trashListProps,
    };

    const ploggingdata = async (ploggingDataInfo: PloggingDataProps) => {
      console.log(ploggingDataInfo);
      try {
        const res = await PloggingAPI.postPloggingDataAxios(ploggingDataInfo);
        console.log('전송데이터 : ', res);
      } catch (err) {
        console.log('error', err);
      }
    };
    ploggingdata(ploggingDataInfo);
    dispatch(resetCounts());
  };

  const trashListProps = useSelector(
    (state: RootState) => state.plogging.trashList,
  );
  const counts = useSelector((state: RootState) => state.plogging.counts);
  return (
    <Con>
      <Container>
        <InfoSection>
          <InfoContentContainer>
            <StopWatch isRunning={isTracking} />
            <Label>시간</Label>
          </InfoContentContainer>

          <InfoContentContainer>
            <InfoText>{counts.쓰레기}</InfoText>
            <Label>쓰레기</Label>
          </InfoContentContainer>

          <InfoContentContainer>
            <InfoText>{distance} m</InfoText>
            <Label>거리</Label>
          </InfoContentContainer>
        </InfoSection>
        <ButtonSection>
          <StartStopButton
            onPress={handleToggleTracking}
            onLongPress={handleLongPress}>
            <Image
              source={isTracking ? stopImage : startImage}
              style={{width: 50, height: 50}}
            />
          </StartStopButton>
        </ButtonSection>
      </Container>
    </Con>
  );
};

export default PloggingInfo;

// Styled components
const Con = styled.View`
  width: 100%;
  height: 25%;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const Container = styled.View`
  width: 90%;
  height: 75%;
  background-color: #fff;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;
const InfoSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const InfoContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.Text`
  font-size: 25px;
  color: #333;
`;

const Label = styled.Text`
  font-size: 10px;
  color: #666;
`;
const ButtonSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StartStopButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
