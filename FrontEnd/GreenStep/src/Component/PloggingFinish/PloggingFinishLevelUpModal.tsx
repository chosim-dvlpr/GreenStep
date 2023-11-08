import React, { useState } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback,
  TouchableOpacity, StyleSheet, Image } from "react-native";
import panda from '../../Image/Avatar/panda.png'
import bird from '../../Image/Avatar/bird.png'
import cow from '../../Image/Avatar/cow.png'
import crocodile from '../../Image/Avatar/crocodile.png'

interface ModalProps {
  onClose: () => void;
  // onSelectAvatar: (boxId:number) => void;
  // avatars : AvatarProps[];
  visible: boolean;
}


const PloggingFinishLevelUpModal : React.FC<ModalProps> = ({ onClose }) => {
  /** 상자 오픈했는지 여부 */
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleIsOpened = () => {
    setIsOpened(true);
  };

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
            <Text style={styles.levelUpText}>레벨 업!</Text>
            <TouchableOpacity
            onPress={handleIsOpened}
            disabled={isOpened}
            >
              {
                isOpened
                ? <View style={styles.avatarContainer}>
                    <Image
                    source={panda}
                    style={styles.avatarImage}
                    />
                    <Text style={styles.bottomText}>OO을 획득했습니다.</Text>
                  </View>
                : <Text>상자 이미지</Text>
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
    fontWeight:'bold', 
    fontSize: 30,
  },
  bottomText: {
    fontSize: 18,
    marginBottom: 20,
  },
  avatarContainer: {
    width: '100%',
    height: '90%',
    paddingTop: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default PloggingFinishLevelUpModal;
