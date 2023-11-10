import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styled from 'styled-components/native';
type StopWatchProps = {
  isRunning: boolean;
};
const StopWatch: React.FC<StopWatchProps> = ({isRunning}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      // 스탑워치 시작
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (interval) {
      // 스탑워치 중지
      clearInterval(interval);
    }

    return () => {
      // 언마운트 시 인터벌 정리
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    // 시간 포맷팅 로직
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <InfoText>{formatTime(time)}</InfoText>
    </View>
  );
};

export default StopWatch;
const InfoText = styled.Text`
  font-size: 25px;
  color: #333;
`;
