import { View, Text, ScrollView } from "react-native"
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../Api/tokenHttp';
import BoardListDetail from "../Component/Board/BoardListDetail";
import TextStyle
 from "../Style/Text";
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


const MyJoinedPloggingList = () =>{

    const isFocused = useIsFocused();
    const [myJoinList, setMyJoinList] = useState<BoardProps[]>([]);

    const getMyJoinPloggingList =async () => {
        try{
            const token = await AsyncStorage.getItem('accessToken')
            const config = {
            headers:{
                Authorization : `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            }
            const res = await axios.get(`${baseURL}/board/attend/list`, config);
            console.log('내 플로깅 참여 목록 조회 성공', res)
            setMyJoinList(res.data)
        }catch(err){
            console.log('내 플로깅 참여 목록 조회 실패', err)
        }
    }
    
    useEffect(() => {
        if (isFocused) {
            getMyJoinPloggingList()
        }
    },[isFocused])

    return(
        <View>
            <View style={{justifyContent:'center', alignItems:'center', marginBottom: 20}}>
            </View>
            <ScrollView >
                {myJoinList.map((list, idx) =>(
                    <BoardListDetail key={idx} {...list}/>
                ))}
            </ScrollView>
        </View>
    )
}
export default MyJoinedPloggingList;