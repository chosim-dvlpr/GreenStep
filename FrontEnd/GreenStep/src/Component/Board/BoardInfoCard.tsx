//상세페이지 - 가운데 Information 컴포넌트
import React, {useState} from 'react'
import { View, Text, Image } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import avatar from '../../Image/Avatar/panda.png';

const BoardInfoCard = () => {
    const [joinInfo, setJoinInfo] = useState({name: '이대경', date : '2030/04/20', member: 3})

    return(
        <View style={{alignItems:'center', marginBottom: 20}}>
            <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}]}>
                <View>
                    <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 20}}>Information</Text>
                    <Text style={{marginBottom: 20}}>{joinInfo.name}</Text>
                    <Text style={{marginBottom: 20}}>날짜 {joinInfo.date}</Text> 
                    <Text style={{marginBottom: 20}}>인원 {joinInfo.member} / 4</Text> 
                </View>
                <View>
                    <Image source={avatar} style={ImageStyle.mediumImage}></Image>
                </View>
            </View>
        </View>
    )
}
export default BoardInfoCard;