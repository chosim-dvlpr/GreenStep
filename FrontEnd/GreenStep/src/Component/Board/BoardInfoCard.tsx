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

const BoardInfoCard: React.FC<{ boardDetail: BoardProps }> = ({ boardDetail }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={[Box.cardBox, { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Information</Text>
          <Text style={{ marginBottom: 10 }}>모집자 : {boardDetail.nickname}</Text>
          <Text style={{ marginBottom: 10 }}>날짜 {boardDetail.scheduleTime}</Text>
          <Text style={{ marginBottom: 10 }}>인원 3/{boardDetail.maxParticipants}</Text>
        </View>
        <Image source={{ uri: boardDetail.avatarImg }} style={ImageStyle.mediumImage}></Image>
      </View>
    </View>
  );
}

export default BoardInfoCard;
