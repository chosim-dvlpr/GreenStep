import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';

// CompetitionGraphic 컴포넌트 정의
const CompetitionGraphic = () => {
  const [progressValue, setProgressValue] = useState(0.5);

  // renderProgressSection을 여기로 옮깁니다.
  const renderProgressSection = (bottomOffset: number) => (
    <ProgressBox bottomOffset={bottomOffset}>
      <Progress.Bar
        progress={progressValue}
        width={290}
        height={14}
        color="#34c759"
      />
      <LottieView
        source={require('../../Image/Competition/flag.json')}
        autoPlay
        loop
        style={styles.flag}
      />
    </ProgressBox>
  );

  return (
    <Graphic>
      <LottieView
        source={require('../../Image/Competition/turtle.json')}
        autoPlay
        loop
        style={styles.turtle}
      />
      {renderProgressSection(40)}
      <LottieView
        source={require('../../Image/Competition/rabbit.json')}
        autoPlay
        loop
        style={styles.rabbit}
      />
      {renderProgressSection(160)}
    </Graphic>
  );
};

// 여기에 필요한 스타일드 컴포넌트를 옮깁니다.
const Graphic = styled.View`
  flex: 3;
  background-color: #f9f9f9;
  border-radius: 50px 50px 0px 0px;
`;

const ProgressBox = styled.View<{bottomOffset: number}>`
  width: 400px;
  align-items: center;
  bottom: ${props => props.bottomOffset}px;
`;

// 그리고 ProgressBox와 관련 스타일...
// StyleSheet에 해당하는 styles 객체...
const styles = StyleSheet.create({
  turtle: {
    width: 150,
    height: 150,
    marginLeft: 10,
  },
  rabbit: {
    width: 150,
    height: 150,
    bottom: 135,
    marginLeft: 10,
    transform: [{scaleX: -1}],
  },
  flag: {
    width: 90,
    height: 80,
    bottom: 85,
    left: 140,
  },
});
export default CompetitionGraphic;
