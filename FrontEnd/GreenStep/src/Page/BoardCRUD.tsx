import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native"
import { useState } from "react";
import BoardCRUDTitle from "../Component/Board/BoardCRUDTitle";
import BoardCRUDContent from "../Component/Board/BoardCRUDContent";
import BoardCRUDInfo from "../Component/Board/BoardCRUDInfo";
import ButtonStyle from "../Style/ButtonStyle";
import ImageStyle from "../Style/Image";
import pencil from '../Image/Board/pencil.png'
import styled from "styled-components/native";

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const BoardCRUD = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
  const onTitleChange = (text:string) => {
    title;
    setTitle(text);
  };
  const onContentChange = (text:string) => {
    content;
    setContent(text);
  };
  return(
    <ScrollView>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
      {/* <Text style={{alignItems:"center", fontSize: 20, justifyContent:"center", marginBottom: 10}}>글 쓰기</Text> */}
      <BoardCRUDTitle onChangeText={onTitleChange}/>
      <BoardCRUDContent onChangeText={onContentChange}/>
      <BoardCRUDInfo/>
      {/* <View style={{justifyContent:'center', alignItems:'center' }}> */}
      <View style={{justifyContent:'center', alignItems:'center' }}>
        <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton]}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
            <Image source={pencil}></Image>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold', marginLeft: 20}}>글 쓰기</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ContainerBg>
    </ScrollView>
  )
}
export default BoardCRUD;