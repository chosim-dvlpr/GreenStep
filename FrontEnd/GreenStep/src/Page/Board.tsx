import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
//component
import BoardMyPost from '../Component/Board/BoardMyPost';
import BoardList from '../Component/Board/BoardList';
//style
import ButtonStyle from '../Style/ButtonStyle';
//image
import pencil from '../Image/Board/pencil.png';
const Board = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{alignItems: 'center', justifyContent: 'center', margin: 20}}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>크루 찾기</Text>
        </View>

        <BoardMyPost navigation={navigation} />
        <BoardList />
      </ScrollView>

      <TouchableOpacity
        style={[
          ButtonStyle.smallButton,
          ButtonStyle.achievementButton,
          {
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          },
        ]}>
        <Image source={pencil} style={{width: 15, height: 15}}></Image>
        <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
          글 쓰기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Board;
