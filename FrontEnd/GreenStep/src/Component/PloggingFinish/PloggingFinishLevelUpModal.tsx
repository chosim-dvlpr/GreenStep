import React, { useState } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback,
  TouchableOpacity, StyleSheet, Image } from "react-native";
import LottieView from 'lottie-react-native';
import treasureBox from '../../Image/PloggingFinish/treasureBox.json'
import confetti from '../../Image/PloggingFinish/confetti.json'

interface ModalProps {
  onClose: () => void;
  visible: boolean;
  avatarName: string,
  avatarImage: string,
}


const PloggingFinishLevelUpModal : React.FC<ModalProps> = ({ onClose, avatarName, avatarImage }) => {
  /** 상자 오픈했는지 여부 */
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleIsOpened = () => {
    setIsOpened(true);
  };

  // // 이미지 불러오기
  // const getAvatarImage = () => {
  //   switch (avatarName) {
  //     case 'panda':
  //       return panda;
  //     case 'bird':
  //       return bird;
  //     case 'cow':
  //       return cow;
  //     case 'crocodile':
  //       return crocodile;
  //     default:
  //       return null; // 혹은 기본 이미지 설정
  //   }
  // };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true}
      onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalView]}>
            <TouchableOpacity
            onPress={handleIsOpened}
            disabled={isOpened}
            >
              {
                isOpened
                ? <View style={styles.avatarContainer}>
                    <Text style={styles.levelUpText}>{avatarName}</Text>
                    <LottieView
                    source={confetti}
                    autoPlay
                    loop
                    style={styles.confettiImage}
                    />
                    <Image
                    source={{uri: avatarImage}}
                    style={styles.avatarImage}
                    />
                    <Text style={styles.bottomText}>{avatarName} 획득!</Text>
                  </View>
                : <View style={styles.treasureBoxContainer}>
                    <Text style={styles.levelUpText}>레벨 업!</Text>
                    <LottieView 
                    source={treasureBox}
                    autoPlay
                    loop
                    style={styles.treasureBoxImage}
                    />
                    <Text style={styles.treasureBoxText}>상자를 획득했습니다.</Text>
                    <Text style={styles.treasureBoxText}>상자를 눌러 열어주세요.</Text>
                  </View>
              }
            </TouchableOpacity>
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
  },
  modalView: {
    width: 300,
    height: 380, 
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-evenly',
  },
  levelUpText: {
    fontWeight: '900', 
    fontSize: 30,
  },
  bottomText: {
    fontSize: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  treasureBoxContainer: {
    alignItems: 'center',
  },
  treasureBoxImage: {
    width: 200,
    height: 200,
  },
  treasureBoxText: {
    fontSize: 18,
    alignSelf: 'center',
  },
  confettiImage: {
    position: 'absolute',
    width: 250,
    height: 250,
    zIndex: -1,
  },
});

export default PloggingFinishLevelUpModal;
