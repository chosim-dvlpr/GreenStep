import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback,
         TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import panda from '../../Image/Avatar/panda.png'
import cow from '../../Image/Avatar/cow.png'
import crocodile from '../../Image/Avatar/crocodile.png'
import bird from '../../Image/Avatar/bird.png'
import ImageStyle from '../../Style/Image';
import { AvatarAPI } from "../../Api/avatarApi";

interface ModalProps {
    onClose: () => void;
    onSelectAvatar: (avatar: any) => void;
    visible: boolean;
}

const ProfileAvatarModal : React.FC<ModalProps> = ({ onSelectAvatar, onClose}) => {
    const [collection, setCollection] = useState([panda, cow, bird, crocodile])
    const [avatars, setAvatars] = useState({})
    // 사용자 캐릭터 불러오기
    const getAvatarInfo = () => {
    AvatarAPI.getAvatarAxios()
    .then((res) =>{
      console.log(res)
    //   setAvatars(res.data)
    } 
      )
    .catch(err => console.log('사용자 캐릭터 조회 axios 에러 : ', err))
  }

  useEffect(() => {
      getAvatarInfo();
    }, [])


    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={true}
            onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay}>
           <TouchableWithoutFeedback>
                <View style={[styles.modalView, {justifyContent:'center', alignItems:'center'}]}>
                    <Text style={{marginBottom: 10, fontWeight:'bold', fontSize: 20}}> 캐릭터 선택</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {collection.map((char, idx) => (
                            <TouchableOpacity onPress={() => onSelectAvatar(char)}>
                                <Image source={char} style={ImageStyle.AvatarImage}></Image>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </View>
            </TouchableWithoutFeedback>
            </View>
            </TouchableWithoutFeedback>
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
        width: 300,
        height: 200, 
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
