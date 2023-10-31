import {View, Text} from 'react-native';
import React from 'react';
import {useState} from 'react';
import styled from 'styled-components/native';
import Calendar from '../Component/Competition/Calendar';

const Competition = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <Container>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <CalendarWrap>
          <Title>경쟁</Title>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </CalendarWrap>
        <Graphic></Graphic>
        <DashBoard>
          <MyTeamDashBoardTitle>내 팀 현황판 (팀 거북)</MyTeamDashBoardTitle>
          <TeamCountWrap>
            <TeamMoveCount></TeamMoveCount>
            <TeamTimeCount></TeamTimeCount>
          </TeamCountWrap>
        </DashBoard>
      </ContainerBg>
    </Container>
  );
};

export default Competition;

export const Container = styled.View``;
export const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const CalendarWrap = styled.View`
  flex: 1.4;
  align-items: center;
  padding-top: 30px;
  justify-content: space-around;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 25px;
`;

export const Graphic = styled.View`
  flex: 3;
  background-color: #f9f9f9;
  border-radius: 50px 50px 0px 0px;
`;
export const DashBoard = styled.View`
  flex: 2;
  background-color: #cce7c9;
  border-radius: 50px 50px 0px 0px;
`;

export const MyTeamDashBoardTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  top: 30px;
  left: 30px;
  flex: 1;
`;

export const TeamCountWrap = styled.View`
  flex: 2;
  width: 100%;
  row-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const TeamMoveCount = styled.View`
  width: 100px;
  height: 80px;
  background-color: white;
`;
export const TeamTimeCount = styled.View`
  width: 100px;
  height: 80px;
  background-color: pink;
`;
