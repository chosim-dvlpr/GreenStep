import {Text, TouchableOpacity} from "react-native";
import Box from "../../Style/Box";

interface PostCardProps{
    title: string;
    member: number;
    date: string;
    onPress : Function;
}

const BoardMyPostCard = (props:PostCardProps) => {
    return(
        <TouchableOpacity style={[Box.mediumCardBox, {marginLeft: 10}]}
                          onPress={() => props.onPress()}>
            <Text style={{fontSize:16, fontWeight:'bold', marginBottom: 10}} numberOfLines={1} ellipsizeMode="tail">{props.title}</Text>
            <Text style={{fontSize:12, marginBottom: 10}}>인원 {props.member}</Text>
            <Text style={{fontSize:12}}>날짜 {props.date}</Text>
        </TouchableOpacity>
    )
}
export default BoardMyPostCard;