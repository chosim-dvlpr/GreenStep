import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {CompetitionAPI} from '../../Api/competitionApi';

// teamData 배열의 항목 타입을 정의합니다.
interface TeamDataItem {
  key: string;
  title: string;
  content: string;
}

const CompetitionDashBoard = () => {
  // useState에 타입을 명시적으로 선언합니다.
  const [teamData, setTeamData] = useState<TeamDataItem[]>([]);

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        // API 호출
        const response = await CompetitionAPI.getCompetitionAxios();
        // response 객체의 존재 여부를 확인합니다.
        if (response && response.data) {
          const {
            myTeamName,
            myTeamScore,
            otherTeamScore,
            otherTeamName,
            goalScore,
            myTeamCompeteTime,
            myTeamCompeteRange,
            myTeamCompeteAmount,
          } = response.data;

          // API 응답으로부터 팀 데이터를 추출하여 상태를 업데이트합니다.
          setTeamData([
            {
              key: '1',
              title: `${myTeamName}의 이동거리`,
              content: `${Math.floor(myTeamCompeteRange).toString()}km`,
            },
            {
              key: '2',
              title: `${myTeamName}의 소요시간`,
              content: `${myTeamCompeteTime}시간`,
            },
            {
              key: '3',
              title: `${myTeamName}의 총 쓰레기`,
              content: `${myTeamCompeteAmount}개`,
            },
            // ...다른 데이터 항목들
          ]);
        } else {
          // 서버로부터 응답이 없거나 데이터가 없는 경우
          console.error('No response or no data from the server');
        }
      } catch (error) {
        console.error('Failed to fetch competititon data', error);
      }
    };

    fetchCompetitionData();
  }, []);

  // 타입을 명시적으로 선언한 renderTeamCountBox 함수
  const renderTeamCountBox = (title: string, content: string) => (
    <TeamCountBox>
      <TeamText>{title}</TeamText>
      <TeamNum>{content}</TeamNum>
    </TeamCountBox>
  );

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
