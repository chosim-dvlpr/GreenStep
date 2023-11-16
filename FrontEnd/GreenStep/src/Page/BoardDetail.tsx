import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

import DetailBoard from '../Component/Board/DetailBoard';
import BoardInfoCard from '../Component/Board/BoardInfoCard';
import BoardInfoParticipationList from '../Component/Board/BoardInfoParticipationList';

import ButtonStyle from "../Style/ButtonStyle";
import { baseURL } from '../Api/tokenHttp';
import TextStyle from '../Style/Text';

interface BoardProps {
  avatarImg: string;
  nickname: string;
  boardId: number;
  boardTitle: string;
  boardContent: string;
  scheduleLocation: string;
  scheduleTime: string;
  maxParticipants: number;
  createdAt: string;
  isAttended: boolean;
}
interface attendListProps{
  userId : number;
  nickname: string;
  avatarImg: string;
}

const BoardDetail= () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();

  const { boardId }: any = route.params;
  const [boardDetail, setBoardDetail] = useState<BoardProps | null>(null);
  const [attendList, setAttendList] = useState<attendListProps[]>([]);
  const [myJoined, setMyJoined] = useState(false)
  const [myNickname, setMynickName] = useState('')
  const [joinCount, setJoinCount] = useState(0)

  const getMyNickname = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.get(`${baseURL}/mypage`, config);
      console.log('유저 조회 성공', res);
      setMynickName(res.data.nickname);
    } catch (err) {
      console.log('유저 조회 실패', err);
    }
  };

  const getBoardDetail = async (boardId: number) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.get(`${baseURL}/board/detail/${boardId}`, config);
      console.log('게시글 상세 조회 성공', res);
      setBoardDetail(res.data);
    } catch (err) {
      console.log('게시글 상세 조회 실패', err);
    }
  };

  const getAttendList =async (boardId:number) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.get(`${baseURL}/attend/attendList/${boardId}`, config);
      console.log('플로깅 참여 회원 목록 조회 성공', res)
      setAttendList(res.data);
      setJoinCount(res.data.length)
    } catch (err) {
      console.log('플로깅 참여 회원 목록 조회 실패', err);
    }
  }
  const getAttendPlogging =async (boardId:number) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.get(`${baseURL}/attend/${boardId}`, config);
      console.log('플로깅 참여 성공', res)
      setMyJoined(true);
    } catch (err) {
      console.log('플로깅 참여 실패', err);
    }
  }
  const getAttendPloggingLeave =async (boardId:number) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.get(`${baseURL}/attend/leave/${boardId}`, config);
      console.log('플로깅 탈퇴 성공', res)
      setMyJoined(false);
    } catch (err) {
      console.log('플로깅 탈퇴 실패', err);
    }
  }
  const patchBoard = async (boardId : number) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.patch(`${baseURL}/board/${boardId}`, boardId, config);
      console.log('게시판 삭제 성공', res);
      navigation.navigate('board')
    } catch (err) {
      console.log('게시판 삭제 실패', err);
    }
  };

  useEffect(() => {
    if (isFocused && boardId) {
      getBoardDetail(boardId);
      getAttendList(boardId);
      getMyNickname();
    }
  }, [isFocused, boardId, myNickname]);

  useEffect(() => {
    if (isFocused && boardId) {
      getAttendList(boardId);
    }
  }, [isFocused, myJoined]);

  useEffect(() => {
    const isParticipating = attendList.some(member => member.nickname === myNickname);
    setMyJoined(isParticipating);
  }, [attendList, myNickname]);

  return (
    <ScrollView>
      {/* 여기에 배경 이미지 관련 코드가 있으면 추가해주세요. */}
      <View style={{ alignItems: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
          <Text style={[TextStyle.defaultBlack, { fontSize: 22, fontWeight: 'bold' }]}>Green Step</Text>
        </View>

        {boardDetail && <DetailBoard boardDetail={boardDetail} />}
        {boardDetail && <BoardInfoCard boardDetail={boardDetail} joinCount={joinCount} />}
        <BoardInfoParticipationList attendList={attendList}/>

        {myJoined ? (
          <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton, { marginBottom: 20 }]}
                            onPress={() => getAttendPloggingLeave(boardId)}>
            <Text style={[TextStyle.defaultBlack, { fontSize: 20 }]}>탈퇴하기</Text>
          </TouchableOpacity>
        ) : (
          joinCount === boardDetail?.maxParticipants ? (
            <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton, { marginBottom: 20 }]}>
              <Text style={[TextStyle.defaultBlack, { fontSize: 20 }]}>모집 완료</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton, { marginBottom: 20 }]}
                              onPress={() => getAttendPlogging(boardId)}>
              <Text style={[TextStyle.defaultBlack, { fontSize: 20 }]}>참여하기</Text>
            </TouchableOpacity>
          )
        )}
        {myNickname === boardDetail?.nickname &&
          <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.RedColor, { marginBottom: 20 }]}
                            onPress={() => patchBoard(boardId)}>
            <Text style={[TextStyle.defaultBlack, { fontSize: 20 }]}>삭제하기</Text>
          </TouchableOpacity>
        }
      </View>
    </ScrollView>
  );
}

export default BoardDetail;