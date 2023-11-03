import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components/native';
import Calendar from '../Component/Competition/Calendar';
import CompetitionGraphic from '../Component/Competition/CompetitionGraphic';
import CompetitionDashBoard from '../Component/Competition/CompetitionDashBoard';
const Competition = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <Container>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <CalendarWrap>
          <Title>경쟁</Title>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </CalendarWrap>
        <CompetitionGraphic />

        <CompetitionDashBoard />
      </ContainerBg>
    </Container>
  );
};
export default Competition;

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
