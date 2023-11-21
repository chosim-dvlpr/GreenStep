import React, { useEffect, useRef, useState } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback,
  TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from "react-native";
import LottieView from 'lottie-react-native';
import treasureBox from '../../Image/PloggingFinish/treasureBox.json'
import confetti from '../../Image/PloggingFinish/confetti.json'
import { getAvatarListType } from '../../Page/PloggingFinish';
import TextStyle from '../../Style/Text';
interface ModalProps {
  onClose: () => void;
  visible: boolean;
  getAvatarList: getAvatarListType[] | undefined
}


const PloggingFinishLevelUpModal : React.FC<ModalProps> = ({ onClose, getAvatarList }) => {
  /** 상자 오픈했는지 여부 */
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleIsOpened = () => {
    setIsOpened(true);
  };

  /** 등장 애니메이션 */
  const fadeAnim = useRef(new Animated.Value(0.1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isOpened) {
      fadeIn();
    }
  }, [isOpened])

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
            {
              isOpened
              ? 
              <ScrollView 
              horizontal={true}
              style={{flexDirection: 'row'}}
              // persistentScrollbar={true}
              showsHorizontalScrollIndicator
              centerContent={true}
              alwaysBounceHorizontal={true}
              >
                {
                  getAvatarList?.map((avatar, idx) => (
                    <TouchableOpacity 
                    key={idx} 
                    style={styles.avatarContainer}>
                      <Text style={[styles.levelUpText, TextStyle.defaultBlack]}>{avatar.avatarName}</Text>
                      <LottieView
                      source={confetti}
                      autoPlay
                      loop
                      style={styles.confettiImage}
                      />
                      <Animated.View
                      style={{opacity: fadeAnim}}
                      >
                        <Image 
                        source={{uri: `${avatar?.avatarImg}`}}
                        style={styles.avatarImage}
                        />
                      </Animated.View>
                      <Text style={[styles.bottomText, TextStyle.defaultBlack]}>{avatar.avatarName} 획득!</Text>
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
              : <View style={styles.treasureBoxContainer}>
                <TouchableOpacity
                  onPress={handleIsOpened}
                  disabled={isOpened}
                  >
                    <Text style={[styles.levelUpText, TextStyle.defaultBlack]}>레벨 업!</Text>
                    <LottieView 
                    source={treasureBox}
                    autoPlay
                    loop
                    style={styles.treasureBoxImage}
                    />
                    <Text style={[styles.treasureBoxText, TextStyle.defaultBlack]}>상자를 획득했습니다.</Text>
                    <Text style={[styles.treasureBoxText, TextStyle.defaultBlack]}>상자를 눌러 열어주세요.</Text>
                  </TouchableOpacity>
                  </View>
            }
          </View>
          </TouchableWithoutFeedback>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

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
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    width: 220,
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
  },
  avatarImage: {
    width: 220,
    height: 220,
    aspectRatio: 1,
  },
  treasureBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
