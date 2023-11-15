//상세페이지 - 게시글 제목, 내용 컴포넌트
import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import ButtonStyle from "../../Style/ButtonStyle";
import avatar from '../../Image/Avatar/panda.png';

const DetailBoard = () => {
  const [detail, setDetail] = useState({
    name : '이대경123', 
    create_at: '10/26 16:45',
    title:'대전 3반 플로깅 하실 분?', 
    content:'2030년 4월 20일 일과 끝나고 플로깅 하실 분 구해요~ 저는 B303의 이대경입니다.'})

  return(
    <View>
      <View style={[Box.cardBox, {marginBottom:20, width: '100%'}]}>
        <View style={[Box.flexRowBox,{marginBottom: 20}]}>
          <Image source={avatar} style={[ImageStyle.tinyImage, {borderRadius: 50, marginRight: 20,}]}></Image>
          <View>
            <Text>{detail.name}</Text>
            <Text>{detail.create_at}</Text>
          </View>
        </View>
        <Text style={{fontWeight:'bold', marginBottom:20}}>{detail.title}</Text>
        <Text>{detail.content}</Text>
      </View>
    </View>
  )
}

export default DetailBoard;