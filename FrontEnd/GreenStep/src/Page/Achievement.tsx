import {View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AchievementButton from '../Component/Achievement/AchievementButton';
import AchievementList from '../Component/Achievement/AcievementList';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../Api/tokenHttp';
import Box from '../Style/Box';

import styled from 'styled-components/native';
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
const screenHeight = Dimensions.get('screen').height;
const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: ${screenHeight}px;
`;


const Achievement = () => {
  const isFocused = useIsFocused();
  const Type = ['거리', '시간', '쓰레기 수', '횟수']
  const [achieveList, setAchieveList] = useState<achieveProps[]>([])
  const [achieveType, setAchieveType] = useState(0);

  const changeAchieveType = (idx: number) => () => {
    setAchieveType(idx);
  };
  
  // 업적 타입별 리스트 불러오기
  const getAchievementList = async (achieveType :number) => {
    try{
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
          'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
        },
      };
      const res = await axios.get(
        `${baseURL}/achieve/${achieveType}`,
        config,
      ); 
    setAchieveList(res.data)
    }catch(err){
      console.log('업적 조회 error', err)
    }
  }

  useEffect(() => {
    if(isFocused){
      getAchievementList(achieveType);
    }
  }, [achieveType, isFocused])
  
  console.log(Type[achieveType],achieveList)


  return (
    <ScrollView>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <View style={[Box.flexRowBox,{justifyContent:'space-evenly', marginTop:20}]}>
          {Type.map((atom, idx) => (
            <AchievementButton key={idx} atom={atom} onPress={changeAchieveType(idx)} />
      ))}
        </View>      
            <Text></Text>
        <View style={{alignItems:'center'}}>
          {achieveList?.map((achievement, idx) => (
            <AchievementList atom={achievement} achievetype={achieveType} key={idx} />
          ))}
        </View>
      </ContainerBg>
    </ScrollView>
  );
};

export default Achievement;