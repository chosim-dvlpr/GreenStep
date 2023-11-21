import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Double} from 'react-native/Libraries/Types/CodegenTypes';

//컴포넌트
import StopWatch from './StopWatch';

//스타일
import styled from 'styled-components/native';
import startImage from '../../Image/PloggingStart/play.png';
import stopImage from '../../Image/PloggingStart/stop.png';

//상태관리
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {useDispatch} from 'react-redux';
import {resetCounts} from '../../Store/ploggingSlice';
import {reset} from '../../Store/aiCountSlice';

//api
import {ploggingdata} from './api/ploggingService';

type PloggingInfoProps = {
  isTracking: boolean;
  handlestart: React.Dispatch<React.SetStateAction<boolean>>;
  distance: number;
  locations: any;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
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
  handlestart,
  distance,
  locations,
  setIsTracking,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간 상태 추가
  const aiCount = useSelector((state: RootState) => state.aiCount.value);

  const handleTimeUpdate = (time: number) => {
    setElapsedTime(time);
  };

  const handleToggleTracking = () => {
    if (!isTracking) {
      handlestart(true);
      setResetStopwatch(false);
    }
  };

  useEffect(() => {
    console.log(`isTracking 상태: ${isTracking}`);
  }, [isTracking]);

  const handleLongPress = async () => {
    setResetStopwatch(true);
    handlestart(false);
    setIsTracking(false);

    const travelRange = distance;
    const ploggingDataInfo = {
      travelTime: elapsedTime,
      travelRange: travelRange,
      trashAmount: counts.쓰레기,
      AITrashAmount: aiCount,
      coorList: locations,
      trashList: trashListProps,
    };
    try {
      const responseData = await ploggingdata(ploggingDataInfo);
      // 응답 데이터 처리
      console.log(responseData);
      navigation.navigate('ploggingfinish', responseData);
    } catch (error) {
      console.error('Error during plogging data submission', error);
    }
    dispatch(resetCounts());
    dispatch(reset());
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
            <StopWatch
              isRunning={isTracking}
              reset={resetStopwatch}
              onTimeUpdate={handleTimeUpdate}
            />
            <Label>시간</Label>
          </InfoContentContainer>

          <InfoContentContainer>
            <InfoText>{counts.쓰레기}</InfoText>
            <Label>쓰레기</Label>
          </InfoContentContainer>

          <InfoContentContainer>
            <InfoText>{Math.round(distance)} m</InfoText>
            <Label>거리</Label>
          </InfoContentContainer>
        </InfoSection>
        <ButtonSection>
          {!isTracking ? (
            <StartStopButton onLongPress={handleToggleTracking}>
              <Image source={startImage} style={{width: 50, height: 50}} />
            </StartStopButton>
          ) : (
            <StartStopButton onLongPress={handleLongPress}>
              <Image source={stopImage} style={{width: 50, height: 50}} />
            </StartStopButton>
          )}
        </ButtonSection>
      </Container>
    </Con>
  );
};

export default PloggingInfo;

// Styled components
const Con = styled.View`
  position: absolute;
  width: 100%;
  height: 25%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 10;
`;
const Container = styled.View`
  width: 90%;
  height: 75%;
  background-color: #fff;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.66);
  padding: 10px;
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
  font-size: 20px;
  color: #333;
  font-family: 'SUITE-Bold';
  margin-bottom: 10;
`;

const Label = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: 'SUITE-Bold';
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
