import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import ImageStyle from '../../../Style/Image';
import { ProfileAPI } from '../../../Api/profileApi';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

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
    
    // 플로깅 상세 이력 불러오기
    const getMyploggingDetail = () => {
        ProfileAPI.getPloggingDetailAxios(index)
        .then((res) =>{
        console.log(res)
        setDetail(res.data)
        } 
        )
        .catch(err => console.log('플로깅 상세 이력 axios 에러 : ', err))
    }

    useEffect(() => {
        getMyploggingDetail();
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
                        <View style={[styles.noWrapRow, {marginBottom: 20}]}>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{detail?.createdAt}</Text>
                                <Text style={{fontSize: 20}}>{types[3]}</Text>
                            </View>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{detail?.getExp}</Text>
                                <Text style={{fontSize: 20}}>{types[4]}</Text>
                            </View>
                        </View>
                        <View style={styles.noWrapRow}>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{detail?.trashAmount} 개</Text>
                                <Text style={{fontSize: 20}}>{types[0]}</Text>
                            </View>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{detail?.travelRange} KM</Text>
                                <Text style={{fontSize: 20}}>{types[1]}</Text>
                            </View>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{detail?.travelTime}</Text>
                                <Text style={{fontSize: 20}}>{types[2]}</Text>
                            </View>
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                        {detail?.travelPicture?( 
                            <Image source={{uri: detail?.travelPicture}} style={ImageStyle.largeImage}></Image>
                        ):(<Text>등록된 사진이 없습니다.</Text>)
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
        width: 350,
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    noWrapRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    center :{
        justifyContent:'center',
        alignItems: 'center'
    }
});
export default MyPloggingDetail;