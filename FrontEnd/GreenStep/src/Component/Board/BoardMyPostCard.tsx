import {Text, TouchableOpacity} from "react-native";
import Box from "../../Style/Box";
import {useNavigation, useRoute} from '@react-navigation/native';

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
        <TouchableOpacity style={[Box.mediumCardBox, {marginLeft: 10}]}
                          onPress={() => navigate.navigate('boarddetail', {boardId : props.boardId})}>
            <Text style={{fontSize:16, fontWeight:'bold', marginBottom: 10}} numberOfLines={1} ellipsizeMode="tail">{props.boardTitle}</Text>
            <Text style={{fontSize:12, marginBottom: 10}}>인원 : {props.maxParticipants}</Text>
            <Text style={{fontSize:12}}>날짜 {props.scheduleTime}</Text>
        </TouchableOpacity>
    )
}
export default BoardMyPostCard;