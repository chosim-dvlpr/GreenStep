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
  const progressBarWidth = 290; // ProgressBar의 너비

  // ProgressBar 진척도에 따른 캐릭터의 x축 위치를 계산하는 함수
  const calculateCharacterPosition = (progressValue: number) => {
    // ProgressBar의 전체 너비에 진척도를 곱하여 캐릭터의 x축 위치를 계산
    return progressBarWidth * progressValue;
  };

  const renderProgressSection = (
    progressValue: number,
    bottomOffset: number,
    characterStyle: any, // 캐릭터 스타일
    characterSource: any, // 캐릭터 소스
    progressMargin: number,
  ) => (
    <ProgressBox bottomOffset={bottomOffset}>
      <ProgressBarContainer style={{marginTop: progressMargin}}>
        <Progress.Bar
          progress={progressValue}
          width={progressBarWidth}
          height={14}
          color="#99D959"
        />
      </ProgressBarContainer>
      <LottieView
        source={characterSource}
        autoPlay
        loop
        style={[
          characterStyle,
          {
            left:
              calculateCharacterPosition(progressValue) - characterStyle.width,
          },
        ]}
      />
      <ProgressTextWrap>
        <ProgressText>0%</ProgressText>
        <ProgressText>50%</ProgressText>
        <ProgressText>100%</ProgressText>
      </ProgressTextWrap>
    </ProgressBox>
  );

  return (
    <Graphic style={styles.container}>
      {renderProgressSection(
        myTeamProgress,
        30,
        styles.turtle,
        require('../../Image/Competition/turtle.json'),
        30,
      )}
      {renderProgressSection(
        opponentTeamProgress,
        130,
        styles.dolphin,
        require('../../Image/Competition/dolphin.json'),
        -40,
      )}
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
    bottom: 60,
  },
  dolphin: {
    width: 140,
    height: 140,
    bottom: 60,
  },
  flag: {
    width: 90,
    height: 80,
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
const ProgressBarContainer = styled.View`
  top: 58px;
`;
const ProgressUpper = styled.View``;
export default CompetitionGraphic;
