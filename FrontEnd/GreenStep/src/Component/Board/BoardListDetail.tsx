import { View, Text, Image } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import avatar from '../../Image/Avatar/panda.png';

interface PostCardProps{
    title: string;
    member: number;
    date: string;
}

const BoardListDetail = (props:PostCardProps) => {
    return(
        <View style={{alignItems:'center', marginBottom: 20}}>
        <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}]}>
            <View>
            <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 20}}>{props.title}</Text>
            <Text style={{marginBottom: 10}}>인원 {props.member}</Text>
            <Text style={{marginBottom: 20}}>날짜 {props.date}</Text> 
            </View>
            <View>
            <Image source={avatar} style={ImageStyle.mediumImage}></Image>
            </View>
        </View>
        </View>
    )
}

export default BoardListDetail;