import {Dimensions, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
//component
import BoardMyPost from '../Component/Board/BoardMyPost';
import BoardList from '../Component/Board/BoardList';
//style
import ButtonStyle from '../Style/ButtonStyle';
//image
import pencil from '../Image/Board/pencil.png';
import styled from 'styled-components/native';

const screenHeight = Dimensions.get('screen').height;

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: ${screenHeight}px;
`;


const Board = ({navigation}:any) => {
  return (
    <View style={{flex:1}}>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{alignItems:'center', justifyContent:'center', margin: 20}}>
            {/* <Text style={{fontSize: 22, fontWeight:'bold'}}>크루 찾기</Text> */}
          </View>
          
          <BoardMyPost/>
          <BoardList/>
          </ScrollView>
          
      </ContainerBg>
      <TouchableOpacity style={[ButtonStyle.smallButton,ButtonStyle.achievementButton,
                              {position:'absolute', bottom: 20, alignSelf: 'center',
                                display:'flex', flexDirection: 'row', 
                                justifyContent: 'space-evenly', alignItems:'center'
                              }]}
                        onPress={()=>navigation.navigate('boardcrud')}       
                              >
          <Image source={pencil} style={{width:15, height: 15}}></Image>
          <Text style={{fontSize:16, color:'white', fontWeight:'bold'}}>글 쓰기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Board;
