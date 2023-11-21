import {Dimensions, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
//component
import BoardMyPost from '../Component/Board/BoardMyPost';
import BoardList from '../Component/Board/BoardList';
//style
import ButtonStyle from '../Style/ButtonStyle';
import TextStyle from '../Style/Text';
//image
import pencil from '../Image/Board/pencil.png';
import styled from 'styled-components/native';
import Box from '../Style/Box';

const screenHeight = Dimensions.get('screen').height;

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: ${screenHeight}px;
`;


const Board = ({navigation}:any) => {
  return (
    <View style={{flex:1}}>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <ScrollView>
          <View style={{alignItems:'center', justifyContent:'center', margin: 20}}>
          </View>
          
          <BoardMyPost/>
          <BoardList/>
          <View style={Box.blankBox}></View>
          <View style={Box.blankBox}></View>
          <View style={Box.blankBox}></View>
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
          <Text style={[TextStyle.defaultBlack, {fontSize:16, color:'white', fontWeight:'bold'}]}>글 쓰기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Board;
