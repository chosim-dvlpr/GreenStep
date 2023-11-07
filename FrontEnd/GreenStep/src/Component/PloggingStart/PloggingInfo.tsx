import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import StopWatch from './StopWatch';
import styled from 'styled-components/native';
type PloggingInfoProps = {
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
  distance: number;
};

const PloggingInfo: React.FC<PloggingInfoProps> = ({
  isTracking,
  setIsTracking,
  distance,
}) => {
  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
  };
  return (
    <View>
      <View>
        <View>
          <Text>{distance} m</Text>
          <Text>거리</Text>
          <Text>거리</Text>
          <Text>거리</Text>
          <Text>거리</Text>
        </View>
        <View>
          <Text>{distance} m</Text>
          <Text>거리</Text>
          <Text>거리</Text>
          <Text>거리</Text>
          <Text>거리</Text>
        </View>
        <View>
          <Text>
            <StopWatch isRunning={isTracking} />
          </Text>
          <Text>거리</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleToggleTracking}>
        <Text>{isTracking ? '중지' : '시작'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PloggingInfo;
const ImageContainer = styled.View`
  alignitems: center;
`;
