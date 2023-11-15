import { View, Text, ScrollView } from "react-native"
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../../Api/tokenHttp';
import BoardListDetail from "./BoardListDetail";

interface BoardProps{
    boardId : number | null;
    boardTitle: string;
    boardContent: string;
    scheduleLocation: string;
    scheduleTime : string;
    maxParticipants: number;
  }

const BoardList = () => {
    const isFocused = useIsFocused();
    const [allBoardList, setAllBoardList] = useState<BoardProps[]>([]);
    
    const getBoards =async () => {
        try{
            const token = await AsyncStorage.getItem('accessToken')
            const config = {
            headers:{
                Authorization : `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            }
            const res = await axios.get(`${baseURL}/board/`, config);
            console.log('전체 게시글 조회 성공', res)
            setAllBoardList(res.data)
        }catch(err){
            console.log('게시글 정보 조회 실패', err)
        }
        }
    
    useEffect(() => {
    if (isFocused) {
        getBoards()
    }
    },[isFocused])

    return(
        <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20, marginBottom: 20}}>최신</Text>
                <ScrollView >
                    {allBoardList.map((list) =>(
                        <BoardListDetail {...list}/>
                    ))}
                </ScrollView>

        </View>
    )
}
export default BoardList;