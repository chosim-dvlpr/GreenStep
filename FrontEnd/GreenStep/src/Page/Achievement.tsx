import {View, Text, Image, ScrollView} from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../Component/Common/CustomButton';
import Box from '../Style/Box';
import ImageStyle from '../Style/Image';
import badge from '../Image/Achievement/badge.png'

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
      <Text>Achievement</Text>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
        {list.map((atom, idx) => (
          <CustomButton title={atom} styleType='smallButton' 
                        backgroundColor='white' color='#5BB450' 
                        fontSize={20} func={changeNumber(idx)} ></CustomButton>
        ))}
      </View>      
          <Text></Text>
      <View style={{alignItems:'center'}}>
        {currentAchievements?.map((achievement, idx) => (
          <View style={[Box.cardBox,
                      {display: 'flex', 
                       flexDirection: 'row',
                       justifyContent: 'space-between', 
                       alignItems:'center',
                       marginBottom: 30,
                      }]}>
            <View>
              <Text style={{fontWeight:'bold', fontSize: 20}}>{list[number]}</Text>
              <Text></Text>
              <Text>{list[number]} {achievement} 달성</Text>
              <Text></Text>
              <Text>달성 날짜 2035/04/23</Text>
            </View>
            <View>
              <Image source={badge} style={ImageStyle.mediumImage}></Image>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Achievement;

