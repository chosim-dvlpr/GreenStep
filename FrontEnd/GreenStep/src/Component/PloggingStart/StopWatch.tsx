import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import BackgroundTimer from 'react-native-background-timer';

type StopWatchProps = {
  isRunning: boolean;
  reset: boolean;
};

const StopWatch: React.FC<StopWatchProps> = ({isRunning, reset}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (reset) {
      setTime(0);
      interval && BackgroundTimer.clearInterval(interval);
    }

    if (isRunning && !reset) {
      interval = BackgroundTimer.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        BackgroundTimer.clearInterval(interval);
      }
    };
  }, [isRunning, reset]);

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

const InfoText = styled.Text`
  font-size: 25px;
  color: #333;
`;
