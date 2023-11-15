import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Calendar from '../Component/Competition/Calendar';
import CompetitionGraphic from '../Component/Competition/CompetitionGraphic';
import CompetitionDashBoard from '../Component/Competition/CompetitionDashBoard';
import {CompetitionAPI} from '../Api/competitionApi';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface CompetitionData {
  myTeamScore: number;
  goalScore: number;
  otherTeamScore: number;
  myTeamName: string;
  myTeamCompeteRange: number;
  myTeamCompeteTime: number;
  myTeamCompeteAmount: number;
  // 다른 필요한 속성들...
}

const Competition = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [competitionData, setCompetitionData] =
    useState<CompetitionData | null>(null);

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
            'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
          },
        };
        const res = await axios.get(
          'https://k9b303.p.ssafy.io/api/compete/',
          config,
        );
        console.log(res.data);
        if (res && res.data) {
          setCompetitionData(res.data);
        } else {
          console.error('No response or no data from the server');
        }
      } catch (error) {
        console.error('Failed to fetch competition data', error);
      }
    };

    fetchCompetitionData();
  }, []);

  const calculateProgress = (teamScore: number, goalScore: number): number => {
    return teamScore / goalScore;
  };

  return (
    <Container>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <CalendarWrap>
          <Title>경쟁</Title>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </CalendarWrap>
        <GraphicText>내 팀 : {competitionData?.myTeamName}</GraphicText>
        {competitionData && (
          <CompetitionGraphic
            myTeamProgress={calculateProgress(
              competitionData.myTeamScore,
              competitionData.goalScore,
            )}
            opponentTeamProgress={calculateProgress(
              competitionData.otherTeamScore,
              competitionData.goalScore,
            )}
          />
        )}
        <CompetitionDashBoard teamData={competitionData} />
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
