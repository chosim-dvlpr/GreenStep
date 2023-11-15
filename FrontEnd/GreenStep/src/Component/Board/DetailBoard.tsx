import React from 'react';
import { View, Text, Image } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";

interface BoardProps {
  avatarImg: string;
  nickname: string;
  boardId: number;
  boardTitle: string;
  boardContent: string;
  scheduleLocation: string;
  scheduleTime: string;
  maxParticipants: number;
  createdAt: string;
  isAttended: boolean;
}

const DetailBoard: React.FC<{ boardDetail: BoardProps }> = ({ boardDetail }) => {
  
  const formattedTime = boardDetail.createdAt.replace('T', ' '); // 'T'를 공백으로 치환
 
  
  return (
    <View>
      <View style={[Box.cardBox, { marginBottom: 20 }]}>
        <View style={[Box.flexRowBox, { marginBottom: 20 }]}>
          <Image source={{ uri: boardDetail.avatarImg }} style={[ImageStyle.tinyImage, { borderRadius: 50, marginRight: 20 }]}></Image>
          <View>
            <Text>{boardDetail.nickname}</Text>
            <Text>{formattedTime}</Text>
          </View>
        </View>
        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{boardDetail.boardTitle}</Text>
        <Text>{boardDetail.boardContent}</Text>
      </View>
    </View>
  );
}

export default DetailBoard;
