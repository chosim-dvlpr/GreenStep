import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import BackgroundTimer from 'react-native-background-timer';

type StopWatchProps = {
  isRunning: boolean;
  reset: boolean;
  onTimeUpdate: (time: number) => void;
};

const StopWatch: React.FC<
  StopWatchProps & {onTimeUpdate: (time: number) => void}
> = ({isRunning, reset, onTimeUpdate}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (reset) {
      setTime(0);
      onTimeUpdate(0); // 시간 업데이트를 부모 컴포넌트에 전달
      interval && BackgroundTimer.clearInterval(interval);
    }

    if (isRunning && !reset) {
      interval = BackgroundTimer.setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          onTimeUpdate(newTime); // 시간 업데이트를 부모 컴포넌트에 전달
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        BackgroundTimer.clearInterval(interval);
      }
    };
  }, [isRunning, reset, onTimeUpdate]);
  useEffect(() => {
    onTimeUpdate(time); // 이 부분을 추가
  }, [time, onTimeUpdate]);

  const formatTime = (time: number) => {
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

// Styled Components
const InfoText = styled.Text`
  font-size: 20px;
  color: #333;
  font-family: 'SUITE-Bold';
  margin-bottom: 10;
`;
