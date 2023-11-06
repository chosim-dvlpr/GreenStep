import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import ImageStyle from '../../../Style/Image';
import avatar from '../../../Image/Avatar/bird.png';
import { ProfileAPI } from '../../../Api/ProfileApi';

const MyPloggingDetail = ({ onClose, index }:any) => {
    const [data, setData] = useState({amount : 10, range:1.5,time : '30:10',
                                      created_at: '2023-10-23',getExp: 100, picture: avatar})
    const [types, setTypes] = useState(['모은 쓰레기','진행 거리', '진행 시간', '플로깅 날짜', '얻은 경험치'])
    
    // 플로깅 상세 이력 불러오기
    const getMyploggingDetail = () => {
        ProfileAPI.getPloggingDetailAxios(index)
        .then((res) =>{
        console.log(res)
        // console.log(index)
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
                <Text>INDEX : {index}</Text>
                <TouchableOpacity onPress={onClose}>
                    <View style={styles.modalView}>
                        <View style={[styles.noWrapRow, {marginBottom: 20}]}>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{data.created_at}</Text>
                                <Text style={{fontSize: 20}}>{types[3]}</Text>
                            </View>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{data.getExp}</Text>
                                <Text style={{fontSize: 20}}>{types[4]}</Text>
                            </View>
                        </View>
                        <View style={styles.noWrapRow}>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{data.amount} 개</Text>
                                <Text style={{fontSize: 20}}>{types[0]}</Text>
                            </View>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{data.range} KM</Text>
                                <Text style={{fontSize: 20}}>{types[1]}</Text>
                            </View>
                            <View style={styles.center}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{data.time}</Text>
                                <Text style={{fontSize: 20}}>{types[2]}</Text>
                            </View>
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Image source={data.picture} style={ImageStyle.largeImage}></Image>
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