import React, {useState} from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, TextInput,
         TouchableOpacity, StyleSheet} from "react-native";
import Box from '../../../Style/Box';
import TextStyle from '../../../Style/Text';

interface ModalProps {
    onClose: () => void;
    checkAble: (newName:string) => void;
    onNameChange: (name : string) => void;
    PatchUserName: (name : string) => void;
    name : string
    changeAble : boolean
}


const UserInfoNameModal = (props: ModalProps) => {
    const [changeName, setChangeName] = useState(props.name)

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={true}
            onRequestClose={props.onClose}>
        <TouchableWithoutFeedback onPress={props.onClose}>
            <View style={styles.modalOverlay}>
           <TouchableWithoutFeedback>
                <View style={[styles.modalView, {justifyContent:'center', alignItems:'center'}]}>       
                    <Text style={[TextStyle.defaultBlack, {fontSize: 24, marginBottom: 15}]}>닉네임 변경</Text>
                    <View style={Box.flexRowBox}>
                        <TextInput style={styles.input} value={changeName} onChangeText={setChangeName}></TextInput>
                        <TouchableOpacity style={styles.checkButton} onPress={() => props.checkAble(changeName)}>
                            <Text style={TextStyle.defaultBlack}>중복 확인</Text>
                        </TouchableOpacity>
                    </View> 

                    <View style={Box.flexRowBox}>
                        <TouchableOpacity 
                            style={[styles.checkButton, !props.changeAble && styles.disabledButton]} 
                            onPress={() => props.PatchUserName(changeName)} 
                            disabled={!props.changeAble}>
                            <Text style={TextStyle.defaultBlack}>변경</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={props.onClose}>
                            <Text style={TextStyle.defaultBlack}>취소</Text>
                        </TouchableOpacity>
                    </View>
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
    checkButton: {
        backgroundColor: '#ACD8A7',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
    },
    cancelButton: {
        backgroundColor: '#e3e3e3',
        padding: 10,
        borderRadius: 10,
        marginLeft: 4
    },
    input: {
        height: 40,
        width: 180,
        marginHorizontal: 10,
        marginBottom: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: 'black'
      },
      disabledButton: {
        backgroundColor: '#ACD8A7',
    },
});

export default UserInfoNameModal;
