import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';

interface CompetitionGraphicProps {
  myTeamProgress: number;
  opponentTeamProgress: number;
}

const CompetitionGraphic = ({
  myTeamProgress,
  opponentTeamProgress,
}: CompetitionGraphicProps) => {
  const renderProgressSection = (
    progressValue: number,
    bottomOffset: number,
  ) => (
    <ProgressBox bottomOffset={bottomOffset}>
      <Progress.Bar
        progress={progressValue}
        width={290}
        height={14}
        color="#99D959"
      />
      <LottieView
        source={require('../../Image/Competition/flag.json')}
        autoPlay
        loop
        style={styles.flag}
      />
      <ProgressTextWrap>
        <ProgressText>0p</ProgressText>
        <ProgressText>25,000p</ProgressText>
        <ProgressText>50,000p</ProgressText>
      </ProgressTextWrap>
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
      {renderProgressSection(myTeamProgress, 40)}
      <LottieView
        source={require('../../Image/Competition/dolphin.json')}
        autoPlay
        loop
        style={styles.dolphin}
      />
      {renderProgressSection(opponentTeamProgress, 170)}
    </Graphic>
  );
};
// 여기에 필요한 스타일드 컴포넌트를 옮깁니다.
const Graphic = styled.View`
  flex: 2.4;
  background-color: white;
  border-radius: 10px;
  width: 90%;
  align-items: center;
  left: 21px;
  padding-bottom: 50px;
`;

const ProgressBox = styled.View<{bottomOffset: number}>`
  width: 400px;
  align-items: center;
  bottom: ${props => props.bottomOffset}px;
`;

const ProgressTextWrap = styled.View`
  flex-direction: row;
  width: 67%;
  justify-content: space-between;
  bottom: 80px;
`;
const ProgressText = styled.Text``;

// 그리고 ProgressBox와 관련 스타일...
// StyleSheet에 해당하는 styles 객체...
const styles = StyleSheet.create({
  turtle: {
    width: 150,
    height: 150,
  },
  dolphin: {
    width: 140,
    height: 140,
    bottom: 135,
  },
  flag: {
    width: 90,
    height: 80,
    bottom: 85,
    left: 140,
  },
});
export default CompetitionGraphic;
