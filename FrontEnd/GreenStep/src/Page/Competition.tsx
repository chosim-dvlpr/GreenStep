import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components/native';
import Calendar from '../Component/Competition/Calendar';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';

const Competition = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0.5);

  const renderTeamCountBox = (title: string, content: string) => (
    <TeamCountBox>
      <TeamText>{title}</TeamText>
      <TeamNum>{content}</TeamNum>
    </TeamCountBox>
  );

  const renderProgressSection = (bottomOffset: number) => (
    <ProgressBox bottomOffset={bottomOffset}>
      <Progress.Bar
        progress={progressValue}
        width={290}
        height={14}
        color="#34c759"
      />
      <LottieView
        source={require('../Image/Competition/flag.json')}
        autoPlay
        loop
        style={styles.flag}
      />
    </ProgressBox>
  );

  return (
    <Container>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <CalendarWrap>
          <Title>경쟁</Title>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </CalendarWrap>
        <Graphic>
          <LottieView
            source={require('../Image/Competition/turtle.json')}
            autoPlay
            loop
            style={styles.turtle}
          />
          {renderProgressSection(40)}
          <LottieView
            source={require('../Image/Competition/rabbit.json')}
            autoPlay
            loop
            style={styles.rabbit}
          />
          {renderProgressSection(160)}
          <Text>팀 토끼의 진행도</Text>
        </Graphic>
        <DashBoard>
          <MyTeamDashBoardTitle>내 팀 현황판 (팀 거북)</MyTeamDashBoardTitle>
          <TeamCountWrap>
            {renderTeamCountBox('팀 거북의 이동거리', '1234km')}
            {renderTeamCountBox('팀 거북의 소요시간', '124시간')}
          </TeamCountWrap>
        </DashBoard>
      </ContainerBg>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const CalendarWrap = styled.View`
  flex: 1.4;
  align-items: center;
  padding-top: 30px;
  justify-content: space-around;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 25px;
`;

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

const DashBoard = styled.View`
  flex: 2;
  background-color: #cce7c9;
  border-radius: 50px 50px 0px 0px;
`;

const MyTeamDashBoardTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 30px;
  font-family: 'SUITE-Bold';
`;

const TeamCountWrap = styled.View`
  flex: 2;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const TeamCountBox = styled.View`
  width: 160px;
  height: 120px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: space-evenly;
`;

const TeamText = styled.Text`
  font-size: 15px;
  font-family: 'SUITE-Bold';
`;

const TeamNum = styled.Text`
  font-weight: bold;
  font-size: 30px;
  font-family: 'SUITE-Bold';
`;

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

export default Competition;
