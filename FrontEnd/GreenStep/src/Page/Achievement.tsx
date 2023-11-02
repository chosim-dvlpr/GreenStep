import {View, Text, ScrollView} from 'react-native';
import React, { useState } from 'react';
import AchievementButton from '../Component/Achievement/AchievementButton';
import AchievementList from '../Component/Achievement/AcievementList';

const Achievement = () => {
  const list = ['거리', '시간', '쓰레기 수', '경쟁']
  const [number, setNumber] = useState(0);
  const changeNumber = (idx: number) => () => {
    setNumber(idx);
  };
  const distances = ['100KM','200KM','300KM','400KM']
  const times = ['10H','20H','30H','40H']
  const trashes = ['100개','200개','300개','400개']
  const competitions = ['10Wins','20Wins','30Wins','40Wins']
  
  let currentAchievements;
  switch(number) {
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
        {list.map((atom, idx) => (
          <AchievementButton atom={atom} onPress={changeNumber(idx)} />
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

