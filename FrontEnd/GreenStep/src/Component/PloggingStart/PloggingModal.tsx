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
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
interface PloggingModalProps {
  onClose: () => void;
  visible: boolean;
}

const PloggingModal: React.FC<PloggingModalProps> = ({onClose, visible}) => {
  const counts = useSelector((state: RootState) => state.plogging.counts);
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
                  resizeMode="contain">
                  <PloggingDivision name="페트병" />
                  <CountText>{counts.페트병}</CountText>
                  {/* 페트병 카운트를 표시 */}
                </StyledImageBackground>
                <StyledImageBackground
                  source={require('../../Image/PloggingStart/bgcircle.png')}
                  resizeMode="contain">
                  <PloggingDivision name="플라스틱" />
                  <CountText>{counts.플라스틱}</CountText>
                  {/* 플라스틱 카운트를 표시 */}
                </StyledImageBackground>
              </PloggingDivisionContainer>
              <PloggingDivisionContainer>
                <StyledImageBackground
                  source={require('../../Image/PloggingStart/bgcircle.png')}
                  resizeMode="contain">
                  <PloggingDivision name="병" />
                  <CountText>{counts.병}</CountText>
                </StyledImageBackground>
                <StyledImageBackground
                  source={require('../../Image/PloggingStart/bgcircle.png')}
                  resizeMode="contain">
                  <PloggingDivision name="캔" />
                  <CountText>{counts.캔}</CountText>
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
const CountText = styled.Text`
  font-size: 16px;
  color: #000;
  margin-top: 8px;
`;
