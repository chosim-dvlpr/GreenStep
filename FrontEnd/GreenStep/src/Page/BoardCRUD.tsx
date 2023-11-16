import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native"
import { DateData } from "react-native-calendars";
import styled from "styled-components/native";
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../Api/tokenHttp';
import { useNavigation } from "@react-navigation/native";

//page
import BoardCRUDTitle from "../Component/Board/BoardCRUDTitle";
import BoardCRUDContent from "../Component/Board/BoardCRUDContent";
import BoardCRUDInfo from "../Component/Board/BoardCRUDInfo";
//style
import ButtonStyle from "../Style/ButtonStyle";
import Box from "../Style/Box";
//Image
import pencil from '../Image/Board/pencil.png'

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const BoardCRUD = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [day, setDay] = useState('날짜 선택하기')
  const [join, setJoin] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)

  const postBoardCreate = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const postData = {
        boardTitle: title,
        boardContent: content,
        scheduleLocation: location,
        scheduleTime: day,
        maxParticipants: join,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(`${baseURL}/board/create`,postData, config);
      console.log('게시글 생성 완료', res);
      navigation.navigate('board')
    } catch (err) {
      console.log('게시글 생성 error', err);
    }
  };


  const handleDay = (day:DateData) => {
    setDay(day.dateString)
    setShowCalendar(false)
  }
    const handleShow = () =>{
        setShowCalendar(!showCalendar)
  }
  const handleJoinPlus = () => {
      setJoin(join+1)
  }
  const handleJoinMinus = () => {
      if (join > 0) {
          setJoin(join-1)
      }
  }

  const onTitleChange = (text:string) => {
    title;
    setTitle(text);
  };
  const onContentChange = (text:string) => {
    content;
    setContent(text);
  };
  const onLocateChange = (text:string) => {
    location;
    setLocation(text);
  };
  useEffect(()=>{
    setTitle('')
    setContent('')
    setLocation('')
    setDay('날짜 선택하기')
    setJoin(0)
  },[])

  return(
    <ScrollView>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
      {/* <Text style={{alignItems:"center", fontSize: 20, justifyContent:"center", marginBottom: 10}}>글 쓰기</Text> */}
      <BoardCRUDTitle onChangeText={onTitleChange}/>
      <BoardCRUDContent onChangeText={onContentChange}/>
      <BoardCRUDInfo day={day} location={location} join={join} showCalendar={showCalendar}
                     handleJoinMinus={handleJoinMinus} handleJoinPlus={handleJoinPlus}
                     onLocateChange={onLocateChange} handleDay={handleDay} handleShow={handleShow} />
      {/* <View style={{justifyContent:'center', alignItems:'center' }}> */}
      <View style={{justifyContent:'center', alignItems:'center' }}>
        <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton]}
                          onPress={postBoardCreate}>
          <View style={[Box.flexRowBox,{justifyContent:'center', alignItems:'center' }]}>
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