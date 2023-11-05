import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import ImageStyle from '../../Style/Image';
import PloggingModal from './PloggingModal';

interface PloggingDivisionProps {
  name: string;
  onPress?: () => void; // Optional, 모든 division에 필요한 것은 아님
}
function getImage(name: string): any {
  switch (name) {
    case 'AI 쓰레기 인식':
      return require('../../Image/PloggingStart/ai_camera.png');
    case '병':
      return require('../../Image/PloggingStart/bottle.png');
    case '캔':
      return require('../../Image/PloggingStart/can.png');
    case '페트병':
      return require('../../Image/PloggingStart/pet.png');
    case '플라스틱':
      return require('../../Image/PloggingStart/plastic.png');
    case '일반쓰레기':
      return require('../../Image/PloggingStart/trash.png');
    case '재활용품':
      return require('../../Image/PloggingStart/trash_img.png');
  }
}
const PloggingDivision: React.FC<PloggingDivisionProps> = ({name, onPress}) => {
  const imageSource = getImage(name);
  const [counts, setCounts] = useState({
    병: 0,
    캔: 0,
    페트병: 0,
    플라스틱: 0,
    일반쓰레기: 0,
  });
  const handlePress = name => {
    if (name === '재활용품' && onPress) {
      onPress();
    } else {
      setCounts(prevCounts => ({
        ...prevCounts,
        [name]: prevCounts[name] + 1,
      }));
      console.log(counts);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => handlePress(name)}>
        <ImageContainer>
          <Image source={imageSource} style={ImageStyle.smallImage} />
        </ImageContainer>
      </TouchableOpacity>
    </>
  );
};

export default PloggingDivision;
const ImageContainer = styled.View`
  alignitems: center;
`;
