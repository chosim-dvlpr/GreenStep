import React from 'react';
import { View, Modal, Text, TouchableWithoutFeedback,
         TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import ImageStyle from '../../Style/Image';

interface ModalProps {
    onClose: () => void;
    onSelectAvatar: (boxId:number) => void;
    avatars : AvatarProps[];
    visible: boolean;
}
interface AvatarProps {
    avatarId: number;
    boxId: number;
    avatarImg: string;
    avatarName: string;
    isSelected: boolean;
}

const ProfileAvatarModal : React.FC<ModalProps> = ({ onSelectAvatar, onClose, avatars}) => {

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
                    <Text style={{marginBottom: 10, fontWeight:'bold', fontSize: 20}}>캐릭터 선택</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {avatars?.map((char, idx) => (
                            <TouchableOpacity key={idx} onPress={() => onSelectAvatar(char.avatarId)}>
                                <Image source={{uri:char.avatarImg}} style={[ImageStyle.AvatarImage,{marginLeft: 5}]}></Image>
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
