import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styled from 'styled-components/native';
type StopWatchProps = {
  isRunning: boolean;
  reset: boolean;
};
const StopWatch: React.FC<StopWatchProps> = ({isRunning, reset}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    // 리셋 상태가 true일 때 시간을 리셋하고 인터벌을 정리합니다.
    if (reset) {
      setTime(0);
      interval && clearInterval(interval);
    }

    // 스탑워치가 실행 중일 때 인터벌을 설정합니다.
    if (isRunning && !reset) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, reset]);

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
