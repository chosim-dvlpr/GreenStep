import React from 'react';
import styled from 'styled-components/native';

const CompetitionDashBoard = () => {
  // renderTeamCountBox 함수를 여기로 이동
  const renderTeamCountBox = (title: string, content: string) => (
    <TeamCountBox>
      <TeamText>{title}</TeamText>
      <TeamNum>{content}</TeamNum>
    </TeamCountBox>
  );

  return (
    <DashBoard>
      <MyTeamDashBoardTitle>현황판</MyTeamDashBoardTitle>
      <TeamCountWrap>
        {renderTeamCountBox('팀 거북의 이동거리', '1234km')}
        {renderTeamCountBox('팀 거북의 소요시간', '124시간')}
      </TeamCountWrap>
    </DashBoard>
  );
};

export default CompetitionDashBoard;

const DashBoard = styled.View`
  flex: 2;
  background-color: #cce7c9;
  border-radius: 50px 50px 0px 0px;
`;

const MyTeamDashBoardTitle = styled.Text`
  font-family: 'SUITE-Bold';
  font-size: 20px;
  margin-top: 30px;
  margin-left: 30px;
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
