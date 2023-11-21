import { View, Text, Image, TouchableOpacity } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import { useNavigation } from "@react-navigation/native";
import TextStyle from "../../Style/Text";
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
            <View style={Box.cardBox}>
                <Text style={[TextStyle.defaultBlack, {fontWeight:'bold', fontSize: 20, marginBottom:10}]}>{props.boardTitle}</Text>
                <View style={[Box.flexRowBox, {justifyContent: 'space-between', alignItems:'center'}]}>
                        <View>
                            <Text style={[TextStyle.defaultBlack, {marginBottom: 20}]}>인원 : {props.maxParticipants}</Text>
                            <Text style={[TextStyle.defaultBlack, {marginBottom: 20}]}>날짜 : {props.scheduleTime}</Text> 
                            <Text style={[TextStyle.defaultBlack, {marginBottom: 20}]}>지역 : {props.scheduleLocation}</Text> 
                        </View>
                        <View>
                            <Image source={{uri : props.avatarImg}} style={[ImageStyle.mediumImage]}></Image>
                        </View>
                </View>
            </View>
    </TouchableOpacity>
  )
}

export default BoardListDetail;