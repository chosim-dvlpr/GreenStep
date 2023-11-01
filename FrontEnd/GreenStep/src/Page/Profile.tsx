import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import Box from '../Style/Box';
import ImageStyle from '../Style/Image';
import time from '../Image/Data/time.png';
import distance from '../Image/Data/distance.png';
import trash from '../Image/Data/trash.png';
import badge from '../Image/Achievement/badge.png'
import character from '../Image/Character/panda.png'

const getMonthLabel = (index :number) => {
  const monthMappings = {
    0: 'Jan',
    4: 'Feb',
    8: 'Mar',
    13: 'Apr',
    17: 'May',
    21: 'Jun',
    26: 'Jul',
    30: 'Aug',
    35: 'Sep',
    39: 'Oct',
    43: 'Nov',
    48: 'Dec'
  };
  return monthMappings[index] || '';
};

const Profile = ({navigation}:any) => {
  return (
    <ScrollView>
      <Text></Text>
      <Text style={{fontSize:45, paddingLeft: 20}}>Hello! User</Text>
      
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}}>
        <View style={{alignItems:'center'}}>
          <Image source={character} style={ImageStyle.mediumImage}></Image>
          <Text style={{fontSize: 22}}>LV.3</Text>
        </View>
        <View style={[Box.calendarBox, {alignItems:'center'}]}>
          <Text>2023</Text>
          <Text></Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Array.from({length:52}).map((_, index) =>(
              <View>
                <Text style={{fontSize:8, fontWeight:'bold'}}>{getMonthLabel(index)}</Text>
                <View key={index} style={Box.weekBox}>
                  <Text style={{fontSize:8}}></Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}}>
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center'}]}>
          <Image source={time} style={ImageStyle.tinyImage}></Image>
          <Text style={{fontSize:13, fontWeight:'bold'}}>00h 00m 00s</Text>
          <Text style={{fontSize:9}}>지구를 지켜준 시간</Text>
        </View>
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center'}]}>
          <Image source={distance} style={ImageStyle.tinyImage}></Image>
          <Text style={{fontWeight:'bold'}}>234 KM</Text>
          <Text style={{fontSize:13}}>깨끗해진 거리</Text>
        </View>
        <View style={[Box.ploggingDataInfoBox, {alignItems:'center'}]}>
          <Image source={trash} style={ImageStyle.tinyImage}></Image>
          <Text style={{fontWeight:'bold'}}>234 개</Text>
          <Text style={{fontSize:13}}>모은 쓰레기</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('achievement')}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 20 }}>업적</Text>
      </TouchableOpacity>      
      
      <View style={{alignItems:'center'}}>
        <Text></Text>
        <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}]}>
          <View>
            <Text style={{fontWeight:'bold', fontSize: 20}}>당신은 플로깅 고수?!</Text>
            <Text></Text>
            <Text>이동 거리 100KM 달성</Text>
            <Text></Text>
            <Text>달성 날짜 2030/04/23</Text>
          </View>
          <View>
            <Image source={badge} style={ImageStyle.mediumImage}></Image>
          </View>
        </View>
        <Text></Text>
        <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}]}>
          <View>
            <Text style={{fontWeight:'bold', fontSize: 20}}>당신은 플로깅 장인!</Text>
            <Text></Text>
            <Text>이동 거리 1000KM 달성</Text>
            <Text></Text>
            <Text>달성 날짜 2035/04/23</Text>
          </View>
          <View>
            <Image source={badge} style={ImageStyle.mediumImage}></Image>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;