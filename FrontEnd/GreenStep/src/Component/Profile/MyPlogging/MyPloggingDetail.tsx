import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import ImageStyle from '../../../Style/Image';
import { ProfileAPI } from '../../../Api/profileApi';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { formatDate, roundedTravelRange, msToHMS } from '../../../Function/Plogging/funcPlogging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../../Api/tokenHttp';
interface PloggingData {
    createdAt: string | null;
    getExp: number;
    ploggingId: number;
    trashAmount: number;
    travelRange: Double;
    travelTime: Double;
    travelPicture : string | null;
  }

const MyPloggingDetail = ({ onClose, index }:any) => {
    const [detail, setDetail] = useState<PloggingData | null>(null);
    const [types, setTypes] = useState(['모은 쓰레기','진행 거리', '진행 시간', '플로깅 날짜', '얻은 경험치'])

    const getMyploggingDetail = async (index : number) => {
        try{
          const token = await AsyncStorage.getItem('accessToken');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
              'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
            },
          };
          const res = await axios.get(
            `${baseURL}/plogging/${index}/detail`,
            config,
          ); 
          console.log(res);
          setDetail(res.data)
        } catch(err){
          console.log('사용자 플로깅 List 조회 error', err)
        } 
    }





    // // 플로깅 상세 이력 불러오기
    // const getMyploggingDetail = () => {
    //     ProfileAPI.getPloggingDetailAxios(index)
    //     .then((res) =>{
    //     console.log(res)
    //     setDetail(res.data)
    //     } 
    //     )
    //     .catch(err => console.log('플로깅 상세 이력 axios 에러 : ', err))
    // }

    useEffect(() => {
        getMyploggingDetail(index);
      }, [index]);
      
    return(
        <Modal
            transparent={true}
            animationType="slide"
            visible={true}
            >
            <View style={styles.modalOverlay}>
                <TouchableOpacity onPress={onClose}>
                    <View style={styles.modalView}>
                        <View style={{marginBottom: 30}}>
                            <View style={[styles.noWrapRow]}>
                                <View style={styles.center}>
                                    <Text style={{fontWeight:'bold', fontSize: 18, color: '#52A447'}}>{types[3]}</Text>
                                    <Text style={{fontSize: 18}}>
                                      {detail?.createdAt ? formatDate(detail.createdAt).datePart : null}
                                    </Text>
                                    <Text style={{fontSize: 18}}>
                                      {detail?.createdAt ? formatDate(detail.createdAt).timePart : null}
                                    </Text>
                                </View>
                                <View style={styles.center}>
                                    <Text style={{fontWeight:'bold', fontSize: 18, color: '#52A447'}}>{types[4]}</Text>
                                    <Text style={{fontSize: 18}}>{detail?.getExp}</Text>
                                </View>
                            </View>
                            <View style={styles.noWrapRow}>
                                <View style={styles.center}>
                                    <Text style={{fontWeight:'bold', fontSize: 18, color: '#52A447'}}>{types[0]}</Text>
                                    <Text style={{fontSize: 18}}>{detail?.trashAmount} 개</Text>
                                </View>
                                <View style={styles.center}>
                                    <Text style={{fontWeight:'bold', fontSize: 18, color: '#52A447'}}>{types[1]}</Text>
                                    <Text style={{fontSize: 18}}>{roundedTravelRange(detail?.travelRange)} KM</Text>
                                </View>
                                <View style={styles.center}>
                                    <Text style={{fontWeight:'bold', fontSize: 18, color: '#52A447'}}>{types[2]}</Text>
                                    <Text style={{fontSize: 18}}>{detail ? msToHMS(detail.travelTime) : "00:00:00"}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                        {detail?.travelPicture?( 
                            <Image source={{uri: detail?.travelPicture}} style={ImageStyle.largeImage}></Image>
                        ):(<Text style={{fontSize: 18, marginTop: 75}}>등록된 사진이 없습니다.</Text>)
                        }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        height: '82%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 30,
    },
    noWrapRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
    },
    center :{
        justifyContent:'center',
        alignItems: 'center',
        padding: 10,
    }
});
export default MyPloggingDetail;