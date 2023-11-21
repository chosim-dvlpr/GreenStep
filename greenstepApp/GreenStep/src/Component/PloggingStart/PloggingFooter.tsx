import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import PloggingDivision from './PloggingDivision';
import TextStyle from '../../Style/Text';
interface PloggingFooterProps {
  openModal: () => void;
  isTracking: boolean;
}

const PloggingFooter: React.FC<PloggingFooterProps> = ({
  openModal,
  isTracking,
}) => {
  return (
    <FooterContainer>
      <Footer>
        <PloggingDivisionContainer>
          <PloggingDivision
            name="AI 쓰레기 인식"
            size="small"
            isTracking={isTracking}
          />
          <Text style={[TextStyle.defaultBlack, {fontFamily: 'SUITE-Bold', marginTop: 4}]}>AI쓰레기 인식</Text>
        </PloggingDivisionContainer>
        <PloggingDivisionContainer>
          <PloggingDivision
            name="일반쓰레기"
            size="small"
            isTracking={isTracking}
          />
          <Text style={[TextStyle.defaultBlack, {fontFamily: 'SUITE-Bold', marginTop: 4}]}>일반 쓰레기</Text>
        </PloggingDivisionContainer>
        <PloggingDivisionContainer>
          <PloggingDivision
            name="재활용품"
            onPress={openModal}
            size="small"
            isTracking={isTracking}
          />
          <Text style={[TextStyle.defaultBlack, {fontFamily: 'SUITE-Bold', marginTop: 4}]}>재활용품</Text>
        </PloggingDivisionContainer>
      </Footer>
    </FooterContainer>
  );
};

export default PloggingFooter;

const FooterContainer = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;

  heigt: 150x;
  z-index: 10;
  width: 100%;
  bottom: 10px;
`;

const Footer = styled.View`
  z-index: 10;
  width: 90%;
  height: 100%;
  margin: 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.66);
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
`;

const PloggingDivisionContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
