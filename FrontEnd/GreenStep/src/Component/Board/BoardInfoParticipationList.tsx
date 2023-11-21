//상세페이지 -참여하기 리스트 컴포넌트
import React from 'react'
import { View, ScrollView} from "react-native";
import Box from '../../Style/Box';
import BoardInfoParticipationDetail from './BoardInfoParticipationDetail';

interface attendListProps{
    userId : number;
    nickname: string;
    avatarImg: string;
  }
  
interface BoardInfoParticipationListProps {
attendList: attendListProps[];
}
const BoardInfoParticipationList = ({attendList} : BoardInfoParticipationListProps) => {

    return(
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 30}}>
            <View style={Box.flexRowBox}>
                {attendList.map((member, idx)=>(
                    <BoardInfoParticipationDetail key={idx} member={member}/>
                ))}
            </View>
        </ScrollView>
    )
}
export default BoardInfoParticipationList;