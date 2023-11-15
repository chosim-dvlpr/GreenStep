import React from 'react'
import { Dimensions, View, Text,TouchableOpacity, ScrollView } from "react-native";
//component
import DetailBoard from '../Component/Board/BoardDetail';
import BoardInfoCard from '../Component/Board/BoardInfoCard';
import BoardInfoParticipationList from '../Component/Board/BoardInfoParticipationList';
//style
import ButtonStyle from "../Style/ButtonStyle";
import styled from 'styled-components/native';

const screenHeight = Dimensions.get('screen').height;
const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: ${screenHeight}px;
`;

const BoardDetail = () => {
    
    return(
        <ScrollView style={{backgroundColor: 'yellow'}}>
            <ContainerBg source={require('../Image/Competition/bg.png')}>
                <View style={{alignItems:'center'}}>
                    <View style={{alignItems:'center', justifyContent:'center', margin: 20}}>
                        {/* <Text style={{fontSize: 22, fontWeight:'bold'}}>크루 찾기</Text> */}
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20}}>
                        <DetailBoard/>
                        <BoardInfoCard/>
                    </View>
                    <BoardInfoParticipationList/>

                    <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton, {marginBottom: 20}]}>
                        <Text style={{color:'white', fontSize:20}}>참여하기</Text>
                    </TouchableOpacity>
                </View>
            </ContainerBg>
        </ScrollView>
    )
}

export default BoardDetail;

