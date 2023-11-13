import React, {useState} from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, TextInput,
         TouchableOpacity, StyleSheet} from "react-native";
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
                    <Text>닉네임 변경</Text>
                    <View style={{display:'flex', flexDirection:'row'}}>
                        <TextInput style={styles.input} value={changeName} onChangeText={setChangeName}></TextInput>
                        <TouchableOpacity style={styles.checkButton} onPress={() => props.checkAble(changeName)}><Text>중복 확인</Text></TouchableOpacity>
                    </View> 

                        <View style={{display:'flex', flexDirection:'row'}}>
                        <TouchableOpacity 
                            style={[styles.checkButton, !props.changeAble && styles.disabledButton]} 
                            onPress={() => props.PatchUserName(changeName)} 
                            disabled={!props.changeAble}>
                            <Text>변경</Text>
                        </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={props.onClose}><Text>취소</Text></TouchableOpacity>
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
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 10,
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
    },
    input: {
        height: 40,
        width: 120,
        marginHorizontal: 20,
        marginBottom: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
      },
      disabledButton: {
        backgroundColor: 'lightgray',
    },
});

export default UserInfoNameModal;
