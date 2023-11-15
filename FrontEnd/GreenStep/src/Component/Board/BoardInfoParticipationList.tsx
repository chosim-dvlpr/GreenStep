//상세페이지 -참여하기 리스트 컴포넌트
import React, {useState} from 'react'
import { View, ScrollView } from "react-native";
import Box from '../../Style/Box';
import BoardInfoParticipationDetail from './BoardInfoParticipationDetail';
const BoardInfoParticipationList = () => {
    const [joinList, setJoinList] = useState(['이대경','강경인','변민지','송원규'])

    return(
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 30}}>
            <View style={Box.flexRowBox}>
                {joinList.map((member, idx)=>(
                    <BoardInfoParticipationDetail/>
                ))}
            </View>
        </ScrollView>
    )
}
export default BoardInfoParticipationList;