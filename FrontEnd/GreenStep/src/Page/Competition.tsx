import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components/native';
import Calendar from '../Component/Competition/Calendar';
import CompetitionGraphic from '../Component/Competition/CompetitionGraphic';
import CompetitionDashBoard from '../Component/Competition/CompetitionDashBoard';
import {CompetitionAPI} from '../Api/competitionApi';
const Competition = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [myTeamName, setMyTeamName] = useState<string>('');

  useEffect(() => {
    const fetchTeamName = async () => {
      try {
        const response = await CompetitionAPI.getCompetitionAxios();
        if (response && response.data) {
          setMyTeamName(response.data.myTeamName);
        } else {
          setMyTeamName('팀 이름을 가져오지 못함');
        }
      } catch (error) {
        console.error('Failed to fetch team name', error);
      }
    };

    fetchTeamName();
  }, []);

  return (
    <Container>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <CalendarWrap>
          <Title>경쟁</Title>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </CalendarWrap>
        <GraphicText>내 팀 : {myTeamName}</GraphicText>
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

const GraphicText = styled.Text`
  font-family: 'SUITE-Bold';
  font-size: 20px;
  margin-left: 30px;
  margin-bottom: 15px;
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
