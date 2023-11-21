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

const DetailBoard: React.FC<{ boardDetail: BoardProps }> = ({ boardDetail }) => {
  
  const formatDateTime = (dateTime: string) => {
    const [date, time] = dateTime.replace('T', ' ').split(' ');
    const [hours, minutes] = time.split(':');
    return `${date} ${hours}:${minutes}`;
  }; 
  const formattedTime = formatDateTime(boardDetail.createdAt);

  return (
      <View style={[Box.cardBox, { marginBottom: 20 }]}>
        <View style={[Box.flexRowBox, { marginBottom: 20 }]}>
          <Image source={{ uri: boardDetail.avatarImg }} style={[ImageStyle.tinyImage, { borderRadius: 50, marginRight: 20 }]}></Image>
          <View>
            <Text style={TextStyle.defaultBlack}>작성자 : {boardDetail.nickname}</Text>
            <Text style={TextStyle.defaultBlack}>작성 시간 : {formattedTime}</Text>
          </View>
        </View>
        <Text style={[TextStyle.defaultBlack, {fontSize: 20,fontWeight: 'bold', marginBottom: 20 }]}>{boardDetail.boardTitle}</Text>
        <Text style={TextStyle.defaultBlack}>{boardDetail.boardContent}</Text>
      </View>
  );
}

export default DetailBoard;
