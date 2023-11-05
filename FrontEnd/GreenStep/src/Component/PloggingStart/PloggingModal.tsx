import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import styled from 'styled-components/native';
import PloggingDivision from './PloggingDivision';

interface PloggingModalProps {
  onClose: () => void;
  visible: boolean;
}

const PloggingModal: React.FC<PloggingModalProps> = ({onClose, visible}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalOverlay>
          <TouchableWithoutFeedback>
            <ModalContainer>
              <PloggingDivisionContainer>
                <StyledImageBackground
                  source={require('../../Image/PloggingStart/bgcircle.png')}
                  resizeMode="contain" // 또는 "contain", "stretch", "repeat", "center" 중 선택
                >
                  <PloggingDivision name="페트병" />
                </StyledImageBackground>
                <StyledImageBackground
                  source={require('../../Image/PloggingStart/bgcircle.png')}
                  resizeMode="contain" // 또는 "contain", "stretch", "repeat", "center" 중 선택
                >
                  <PloggingDivision name="플라스틱" />
                </StyledImageBackground>
              </PloggingDivisionContainer>
              <PloggingDivisionContainer>
                <StyledImageBackground
                  source={require('../../Image/PloggingStart/bgcircle.png')}
                  resizeMode="contain" // 또는 "contain", "stretch", "repeat", "center" 중 선택
                >
                  <PloggingDivision name="병" />
                </StyledImageBackground>
                <StyledImageBackground
                  source={require('../../Image/PloggingStart/bgcircle.png')}
                  resizeMode="contain" // 또는 "contain", "stretch", "repeat", "center" 중 선택
                >
                  <PloggingDivision name="캔" />
                </StyledImageBackground>
              </PloggingDivisionContainer>
              <CloseButton onPress={onClose}>
                <ButtonText>닫기</ButtonText>
              </CloseButton>
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PloggingModal;

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  background-color: white;
  width: 85%;
  height: 500px;
  border-radius: 10px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const PloggingDivisionContainer = styled.View`
  flex-direction: row;

  margin: 10px;
`;
const StyledImageBackground = styled(ImageBackground)`
  width: 130px;
  height: 130px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
`;
const CloseButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: red;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
