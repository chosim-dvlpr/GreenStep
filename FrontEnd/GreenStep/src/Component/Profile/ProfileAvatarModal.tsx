import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import panda from '../../Image/Avatar/panda.png'
import cow from '../../Image/Avatar/cow.png'
import crocodile from '../../Image/Avatar/crocodile.png'
import bird from '../../Image/Avatar/bird.png'
import ImageStyle from '../../Style/Image';
const ProfileAvatarModal = ({ onClose, onSelectAvatar }:any) => {
    const [collection, setCollection] = useState([panda, cow, bird, crocodile])

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={true}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalView, {justifyContent:'center', alignItems:'center'}]}>
                    <Text style={{marginBottom: 10, fontWeight:'bold', fontSize: 20}}> 캐릭터 선택</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {collection.map((char, idx) => (
                            <TouchableOpacity onPress={() => onSelectAvatar(char)}>
                                <Image source={char} style={ImageStyle.AvatarImage}></Image>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text>선택하기</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    );
};

// 여기에 스타일을 추가합니다.
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
    modalView: {
        width: 300, // 모달 창의 너비
        height: 200, // 모달 창의 높이
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 10,
    }
});

export default ProfileAvatarModal;
