import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused, useRoute } from '@react-navigation/native';

import DetailBoard from '../Component/Board/DetailBoard';
import BoardInfoCard from '../Component/Board/BoardInfoCard';
import BoardInfoParticipationList from '../Component/Board/BoardInfoParticipationList';

import ButtonStyle from "../Style/ButtonStyle";
import { baseURL } from '../Api/tokenHttp';

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

const BoardDetail= () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const { boardId }: any = route.params;
  const [boardDetail, setBoardDetail] = useState<BoardProps | null>(null);

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
      setBoardDetail(res.data);
    } catch (err) {
      console.error('게시글 상세 조회 실패', err);
    }
  };

  useEffect(() => {
    if (isFocused && boardId) {
      getBoardDetail(boardId);
    }
  }, [isFocused, boardId]);

  return (
    <ScrollView>
      {/* 여기에 배경 이미지 관련 코드가 있으면 추가해주세요. */}
      <View style={{ alignItems: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>크루 찾기</Text>
        </View>

        {boardDetail && <DetailBoard boardDetail={boardDetail} />}
        {boardDetail && <BoardInfoCard boardDetail={boardDetail} />}
        <BoardInfoParticipationList />

        <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton, { marginBottom: 20 }]}>
          <Text style={{ color: 'white', fontSize: 20 }}>참여하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default BoardDetail;
