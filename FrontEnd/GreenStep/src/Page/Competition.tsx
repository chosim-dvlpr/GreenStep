import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Calendar from '../Component/Competition/Calendar';
import CompetitionGraphic from '../Component/Competition/CompetitionGraphic';
import CompetitionDashBoard from '../Component/Competition/CompetitionDashBoard';
import {CompetitionAPI} from '../Api/competitionApi';

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
        const response = await CompetitionAPI.getCompetitionAxios();
        if (response && response.data) {
          setCompetitionData(response.data);
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
