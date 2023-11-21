import { View, Modal, Text, TouchableWithoutFeedback,
    TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import TextStyle from "../../Style/Text";
interface ModalProps {
    onClose: () => void;
    userVictory : VictoryProps[];
    visible: boolean;
}

interface VictoryProps{
    alarmId :number;
    title: string;
    content: string;
    createdAt : string;
    isReward : boolean;
  }

const VictortyModal: React.FC<ModalProps> = ({ onClose, userVictory}) => {
    return(
        <Modal
            transparent={true}
            animationType="fade"
            visible={true}>
            <View style={styles.modalOverlay}>
                <View style={[styles.modalView, {justifyContent:'center', alignItems:'center'}]}>
                    {userVictory.map((victory, index) => (
                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[TextStyle.defaultBlack, { marginBottom: 10, fontWeight: 'bold', fontSize: 20 }]}>{victory.title}</Text>
                            <Text style={[TextStyle.defaultBlack, { marginBottom: 10, fontWeight: 'bold', fontSize: 20 }]}>{victory.content}</Text>
                        </View>
                    ))}
                    <TouchableOpacity onPress={onClose}>
                        <Text style={TextStyle.defaultBlack}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

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

export default VictortyModal