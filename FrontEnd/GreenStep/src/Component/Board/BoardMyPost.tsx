import { View, Text,ScrollView } from "react-native";
import React, {useState, useEffect} from 'react';
import BoardMyPostCard from "./BoardMyPostCard";
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../../Api/tokenHttp';
import TextStyle from "../../Style/Text";
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

const BoardMyPost = () => {

    const isFocused = useIsFocused();
    const [myBoardList, setMyBoardList] = useState<BoardProps[]>([]);

    const getMyBoards =async () => {
        try{
            const token = await AsyncStorage.getItem('accessToken')
            const config = {
            headers:{
                Authorization : `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            }
            const res = await axios.get(`${baseURL}/board/myList`, config);
            console.log('내 게시글 조회 성공', res)
            setMyBoardList(res.data)
        }catch(err){
            console.log('내 게시글 정보 조회 실패', err)
        }
        }

    useEffect(() => {
        if (isFocused) {
            getMyBoards()
        }
    },[isFocused])

    return(
        <View>
            <Text style={[TextStyle.defaultBlack, { fontSize: 20, fontWeight: 'bold', paddingLeft: 20, marginBottom: 20}]}>내 글</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 30}}>
                {myBoardList.map((list, idx) =>(
                    <BoardMyPostCard key={idx} {...list}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default BoardMyPost;