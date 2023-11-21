import React from 'react';
import {Modal, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import PloggingDivision from './PloggingDivision';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
interface PloggingModalProps {
  onClose: () => void;
  visible: boolean;
  isTracking: boolean;
}

const PloggingModal: React.FC<PloggingModalProps> = ({
  onClose,
  visible,
  isTracking,
}) => {
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
                <StyledImageBackground>
                  <PloggingDivision
                    name="페트병"
                    size="medium"
                    isTracking={isTracking}
                  />
                  <CountText>{counts.페트병}</CountText>
                </StyledImageBackground>
                <StyledImageBackground>
                  <PloggingDivision
                    name="플라스틱"
                    size="medium"
                    isTracking={isTracking}
                  />
                  <CountText>{counts.플라스틱}</CountText>
                </StyledImageBackground>
              </PloggingDivisionContainer>
              <PloggingDivisionContainer>
                <StyledImageBackground>
                  <PloggingDivision
                    name="병"
                    size="medium"
                    isTracking={isTracking}
                  />
                  <CountText>{counts.병}</CountText>
                </StyledImageBackground>
                <StyledImageBackground>
                  <PloggingDivision
                    name="캔"
                    size="medium"
                    isTracking={isTracking}
                  />
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
const StyledImageBackground = styled.View`
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
