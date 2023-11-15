import React from 'react'
import { View, Text,TouchableOpacity, ScrollView } from "react-native";
//component
import DetailBoard from '../Component/Board/BoardDetail';
import BoardInfoCard from '../Component/Board/BoardInfoCard';
import BoardInfoParticipationList from '../Component/Board/BoardInfoParticipationList';
//style
import ButtonStyle from "../Style/ButtonStyle";
const BoardDetail = () => {
    
    return(
        <ScrollView>
            <View style={{alignItems:'center'}}>
                <View style={{alignItems:'center', justifyContent:'center', margin: 20}}>
                    <Text style={{fontSize: 22, fontWeight:'bold'}}>크루 찾기</Text>
                </View>
                
                <DetailBoard/>
                <BoardInfoCard/>
                <BoardInfoParticipationList/>

                <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton, {marginBottom: 20}]}>
                    <Text style={{color:'white', fontSize:20}}>참여하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default BoardDetail;

