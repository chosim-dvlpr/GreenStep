import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

// CompetitionData 인터페이스를 가져오거나 정의합니다.
interface CompetitionData {
  myTeamName: string;
  myTeamCompeteRange: number;
  myTeamCompeteTime: number;
  myTeamCompeteAmount: number;
  // 필요한 다른 속성들...
}

// TeamDataItem 인터페이스 정의
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

// TeamDataItem 인터페이스 정의
interface TeamDataItem {
  key: string;
  title: string;
  content: string;
}

interface CompetitionDashBoardProps {
  teamData: CompetitionData | null;
}

const CompetitionDashBoard = ({teamData}: CompetitionDashBoardProps) => {
  const renderTeamCountBox = (title: string, content: string) => (
    <TeamCountBox style={styles.teamCount}>
      <TeamText>{title}</TeamText>
      <TeamNum>{content}</TeamNum>
    </TeamCountBox>
  );

  const teamDataList: TeamDataItem[] = teamData
    ? [
        {
          key: '1',
          title: `${teamData.myTeamName}의 이동거리`,
          content: `${Math.floor(teamData.myTeamCompeteRange).toString()}km`,
        },
        {
          key: '2',
          title: `${teamData.myTeamName}의 소요시간`,
          content: `${teamData.myTeamCompeteTime}시간`,
        },
        {
          key: '3',
          title: `${teamData.myTeamName}의 총 쓰레기`,
          content: `${teamData.myTeamCompeteAmount}개`,
        },
        // ...다른 데이터 항목들
      ]
    : [];

  return (
    <DashBoard>
      <MyTeamDashBoardTitle>현황판</MyTeamDashBoardTitle>
      <FlatList
        data={teamDataList}
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

const styles = StyleSheet.create({
  teamCount: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
})