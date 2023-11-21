import {Text, TouchableOpacity, View} from "react-native";
import Box from "../../Style/Box";
import {useNavigation} from '@react-navigation/native';
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

const BoardMyPostCard = (props:BoardProps) => {
    const navigate = useNavigation();

    return(
        <View style={[Box.mediumCardBox, {marginLeft: 10, flex: 1}]}>
            <TouchableOpacity onPress={() => navigate.navigate('boarddetail', {boardId : props.boardId})}>
                <Text style={[TextStyle.defaultBlack, {fontSize:16, fontWeight:'bold', marginBottom: 10}]} numberOfLines={1} ellipsizeMode="tail">{props.boardTitle}</Text>
                <Text style={[TextStyle.defaultBlack, {fontSize:12, marginBottom: 10}]}>인원 : {props.maxParticipants}</Text>
                <Text style={[TextStyle.defaultBlack, {fontSize:12}]}>날짜 {props.scheduleTime}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default BoardMyPostCard;