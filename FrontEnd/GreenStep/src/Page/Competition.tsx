import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components/native';
import Calendar from '../Component/Competition/Calendar';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import CompetitionGraphic from '../Component/Competition/CompetitionGraphic';
const Competition = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const renderTeamCountBox = (title: string, content: string) => (
    <TeamCountBox>
      <TeamText>{title}</TeamText>
      <TeamNum>{content}</TeamNum>
    </TeamCountBox>
  );

  return (
    <Container>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <CalendarWrap>
          <Title>경쟁</Title>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </CalendarWrap>
        <CompetitionGraphic />
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
  font-family: 'SUITE-Bold';
  font-size: 25px;
`;

const DashBoard = styled.View`
  flex: 2;
  background-color: #cce7c9;
  border-radius: 50px 50px 0px 0px;
`;

const MyTeamDashBoardTitle = styled.Text`
  font-family: 'SUITE-Bold';
  font-size: 20px;
  margin-top: 30px;
  margin-left: 31px;
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
  font-size: 30px;
  font-family: 'SUITE-Bold';
`;

export default Competition;
