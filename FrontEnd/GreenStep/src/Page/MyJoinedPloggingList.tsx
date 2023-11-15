import { Text, View } from "react-native";
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../Api/tokenHttp';

interface myJoinPloggingListProps{
    boardId : number;
    nickname : string;
    avatarImage : string;
    boardTitle: string;
    boardContent: string;
    scheduleTime : string;
    scheduleLocation: string;
    maxParticipants: number;
    createdAt : string;
    updatedAt : string;
    isDeleted: boolean;
    isAttended: boolean;
  }


const MyJoinedPloggingList = () =>{

    const isFocused = useIsFocused();
    const [myJoinList, setMyJoinList] = useState<myJoinPloggingListProps[]>([]);

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
            {myJoinList.map((list, idx) =>(
                <View>
                    <Text>{list.boardTitle}</Text>
                </View>
            ))}
        </View>
    )
}
export default MyJoinedPloggingList;