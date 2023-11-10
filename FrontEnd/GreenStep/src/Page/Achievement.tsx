import {View, Text, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import AchievementButton from '../Component/Achievement/AchievementButton';
import AchievementList from '../Component/Achievement/AcievementList';
import { AchievementAPI } from '../Api/achievementAPi';
interface achieveProps{
  achieveName : string;
  achievePloggingCount: number | null;
  achieveTrashAmount : number | null;
  achieveTravelRange : number | null;
  achieveTravelTime: number | null;
  createdAt : string | null;
  myPloggingCount : number | null;
  myTrashAmount : number | null;
  myTravelRange: number | null;
  myTravelTime: number | null;
}

const Achievement = () => {
  const Type = ['거리', '시간', '쓰레기 수', '횟수']
  const [achieveList, setAchieveList] = useState<achieveProps[]>([])
  const [achieveType, setAchieveType] = useState(0);

  const changeAchieveType = (idx: number) => () => {
    setAchieveType(idx);
  };
  
  // 업적 타입별 리스트 불러오기
  const getAchievementList = async (achieveType :number) => {
    try{
      const res = await AchievementAPI.getAchievementAxios(achieveType);
      setAchieveList(res.data)
    }catch(err){
      console.log('업적 조회 error', err)
    }
  }

  useEffect(() => {
    getAchievementList(achieveType);
  }, [achieveType])
  
  console.log(Type[achieveType],achieveList)


  return (
    <ScrollView>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:20}}>
        {Type.map((atom, idx) => (
          <AchievementButton key={idx} atom={atom} onPress={changeAchieveType(idx)} />
    ))}
      </View>      
          <Text></Text>
      <View style={{alignItems:'center'}}>
        {achieveList?.map((achievement, idx) => (
          <AchievementList atom={achievement} key={idx} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Achievement;