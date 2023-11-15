import { View, Text, ScrollView, Linking, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../Api/tokenHttp';
import Box from "../Style/Box";
import styled from "styled-components/native";

interface eventListProps{
    festivalName: string;
    festivalUrl: string;
}

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;


const Event = () => {
    const isFocused = useIsFocused();
    const [eventList, setEventList] = useState<eventListProps[]>([])

    //이벤트 리스트 가져오기
    const getEventAxios =async () => {
        try{
            const token = await AsyncStorage.getItem('accessToken')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
            }
            const res = await axios.get(`${baseURL}/festival/`, config)
            console.log(res)
            setEventList(res.data)
        }catch(err){
            console.log('플로깅 이벤트 리스트 목록 조회 실패', err)
        }
    }

    useEffect(() => {
        if (isFocused) {
            getEventAxios()
        }
    },[isFocused]) 

    const openURL = (url: string) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("URL open 실패 " + url);
            }
        });
    };

    return(
        <ScrollView>
            <ContainerBg source={require('../Image/Competition/bg.png')}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text></Text>
                    {eventList?.map((event) =>(
                        <View style={[Box.cardBox,{marginBottom: 15}]}>
                        <TouchableOpacity 
                        onPress={() => openURL(event.festivalUrl)}
                        style={{padding: 10}}
                        >
                            <Text style={{fontSize: 20, fontFamily: 'SUITE-Bold'}} ellipsizeMode="tail" numberOfLines={1}>{event.festivalName}</Text>
                        </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ContainerBg>
        </ScrollView>
    )
}

export default Event;