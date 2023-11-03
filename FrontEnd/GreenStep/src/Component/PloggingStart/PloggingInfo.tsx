import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import StopWatch from './StopWatch';
// import PloggingDivision from './PloggingDivision';
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
      <View style={{flexDirection: 'row'}}>
        <Text>{distance} m</Text>
        <Text>
          <StopWatch isRunning={isTracking} />
        </Text>
      </View>

      <TouchableOpacity onPress={handleToggleTracking}>
        <Text>{isTracking ? '중지' : '시작'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PloggingInfo;
