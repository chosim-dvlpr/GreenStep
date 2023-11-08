import {View, Text, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import AchievementButton from '../Component/Achievement/AchievementButton';
import AchievementList from '../Component/Achievement/AcievementList';
import { AchievementAPI } from '../Api/achievementAPi';

const Achievement = () => {
  const Type = ['거리', '시간', '쓰레기 수', '경쟁']
  const [achieveList, setAchieveList] = useState([])
  const [achieveType, setAchieveType] = useState(0);
  const changeAchieveType = (idx: number) => () => {
    setAchieveType(idx);
  };
  const distances = ['100KM','200KM','300KM','400KM']
  const times = ['10H','20H','30H','40H']
  const trashes = ['100개','200개','300개','400개']
  const competitions = ['10Wins','20Wins','30Wins','40Wins']
  
  // 업적 타입별 리스트 불러오기
  const getAchievementList = async (achieveType :number) => {
    try{
      const res = await AchievementAPI.getAchievementAxios(achieveType);
      console.log(res)
      // setAchieveList(res.data)
    }catch(err){
      console.log('업적 조회 error', err)
    }
  }

  useEffect(() => {
    getAchievementList(achieveType);
    // console.log(achieveList)
  }, [achieveType])

  let currentAchievements;
  switch(achieveType) {
    case 0:
      currentAchievements = distances;
      break;
    case 1:
      currentAchievements = times;
      break;
    case 2:
      currentAchievements = trashes;
      break;
    case 3:
      currentAchievements = competitions;
      break;
  }

  return (
    <ScrollView>
      <Text></Text>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
        {Type.map((atom, idx) => (
          <AchievementButton atom={atom} onPress={changeAchieveType(idx)} />
    ))}
      </View>      
          <Text></Text>
      <View style={{alignItems:'center'}}>
        {currentAchievements?.map((achievement, idx) => (
          <AchievementList atom={achievement} key={idx} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Achievement;