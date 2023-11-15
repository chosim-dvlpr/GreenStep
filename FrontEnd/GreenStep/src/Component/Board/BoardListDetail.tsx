import { View, Text, Image, TouchableOpacity } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import avatar from '../../Image/Avatar/panda.png';
import { useNavigation } from "@react-navigation/native";

interface BoardProps{
  avatarImg : string;
  nickname : string;
  boardId : number;
  boardTitle: string;
  boardContent: string;
  scheduleLocation: string;
  scheduleTime : string;
  maxParticipants: number;
  createdAt : string;
  isAttended: boolean;
}

const BoardListDetail = (props:BoardProps) => {
  const navigation = useNavigation();

  return(
    <TouchableOpacity 
    onPress={() => navigation.navigate('boarddetail', {boardId : props.boardId})}
    style={{alignItems:'center', marginBottom: 20}}>
      <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}]}>
        <View>
        <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 20}}>{props.boardTitle}</Text>
            <Text style={{marginBottom: 20}}>인원 {props.maxParticipants}</Text>
            <Text style={{marginBottom: 20}}>날짜 {props.scheduleTime}</Text> 
        </View>
        <View>
          <Image source={avatar} style={ImageStyle.mediumImage}></Image>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default BoardListDetail;