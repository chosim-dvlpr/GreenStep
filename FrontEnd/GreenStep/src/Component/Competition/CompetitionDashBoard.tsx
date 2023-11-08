import React from 'react';
import {FlatList, Dimensions} from 'react-native';
import styled from 'styled-components/native';

const CompetitionDashBoard = () => {
  // renderTeamCountBox 함수를 여기로 이동
  const renderTeamCountBox = (title: string, content: string) => (
    <TeamCountBox>
      <TeamText>{title}</TeamText>
      <TeamNum>{content}</TeamNum>
    </TeamCountBox>
  );
  const teamData = [
    {key: '1', title: '팀 거북의 이동거리', content: '1234km'},
    {key: '2', title: '팀 거북의 소요시간', content: '124시간'},
    {key: '3', title: '팀 거북의 총 쓰레기', content: '124개'},
    // 여기에 추가 데이터를 키와 함께 추가할 수 있습니다.
  ];

  return (
    <DashBoard>
      <MyTeamDashBoardTitle>현황판</MyTeamDashBoardTitle>
      <FlatList
        data={teamData}
        renderItem={({item}) => renderTeamCountBox(item.title, item.content)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
      />
    </DashBoard>
  );
};

export default CompetitionDashBoard;

const DashBoard = styled.View`
  flex: 2;
  margin-top: 10px;
  margin-right: 22px;
`;

const MyTeamDashBoardTitle = styled.Text`
  font-family: 'SUITE-Bold';
  font-size: 20px;
  margin-top: 17px;
  margin-left: 30px;
`;

const TeamCountBox = styled.View`
  width: 160px;
  height: 120px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 15px;
  margin-left: 23px;
`;

const TeamText = styled.Text`
  font-size: 15px;
  font-family: 'SUITE-Bold';
`;

const TeamNum = styled.Text`
  font-size: 30px;
  font-family: 'SUITE-Bold';
`;
