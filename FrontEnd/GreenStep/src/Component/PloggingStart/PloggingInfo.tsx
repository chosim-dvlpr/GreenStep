import React, {useEffect, useState} from 'react';
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
import {reset} from '../../Store/aiCountSlice';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const handleLongPress = () => {
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

    console.log(`isTracking을 false로 설정함`);
    const ploggingdata = async (ploggingDataInfo: PloggingDataProps) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
            'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
          },
        };

        // axios를 사용해 API 호출
        const res = await axios.post(
          'https://k9b303.p.ssafy.io/api/plogging/end',
          ploggingDataInfo,
          config,
        );
        const ploggingFinishData = {
          // API 응답에서 직접 가져온 데이터
          ploggingId: res.data.ploggingId,
          getExp: res.data.getExp,
          isLevelUp: res.data.isLevelUp,
          getAvatarList: res.data.getAvatarList, //api에 이거 객체로전달
          travelTime: res.data.travelTime.toString(), // 여행 시간을 문자열로 변환
          travelRange: res.data.travelRange,
          trashAmount: res.data.trashAmount,

          acheiveInfo: 0, // 달성 정보 (실제 사용 시에는 적절한 값으로 변경)
        };

        // PloggingFinish 컴포넌트로 네비게이션
        console.log(`isTracking 상태: ${isTracking}`);

        navigation.navigate('ploggingfinish', ploggingFinishData);
      } catch (err) {
        console.log('error', err);
      }
    };
    ploggingdata(ploggingDataInfo);
    dispatch(resetCounts());
    dispatch(reset());
    console.log(aiCount);
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
          {/* <StartStopButton
            onPress={handleToggleTracking}
            onLongPress={handleLongPress}>
            <Image
              source={isTracking ? stopImage : startImage}
              style={{width: 50, height: 50}}
            />
          </StartStopButton> */}
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
