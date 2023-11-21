import React from 'react';
import { View, Text, Image } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import TextStyle from '../../Style/Text';
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

interface BoardInfoCardProps {
  boardDetail: BoardProps;
  joinCount: number;
}

const BoardInfoCard: React.FC<BoardInfoCardProps> = ({ boardDetail, joinCount }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={[Box.cardBox, { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[TextStyle.defaultBlack, { fontWeight: 'bold', fontSize: 20, marginBottom: 20 }]}>Information</Text>
          <Text style={[TextStyle.defaultBlack, { marginBottom: 5 }]}>모집자 : {boardDetail.nickname}</Text>
          <Text style={[TextStyle.defaultBlack, { marginBottom: 5 }]}>날짜 : {boardDetail.scheduleTime}</Text>
          <Text style={[TextStyle.defaultBlack, { marginBottom: 5 }]}>인원 : {joinCount}/{boardDetail.maxParticipants}</Text>
          <Text style={[TextStyle.defaultBlack, { marginBottom: 5 }]}>지역 :  {boardDetail.scheduleLocation}</Text>
        </View>
        <Image source={{ uri: boardDetail.avatarImg }} style={ImageStyle.mediumImage}></Image>
      </View>
    </View>
  );
}

export default BoardInfoCard;
