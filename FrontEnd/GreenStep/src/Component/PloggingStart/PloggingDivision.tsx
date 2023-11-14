import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import ImageStyle from '../../Style/Image';
import PloggingModal from './PloggingModal';
import {useDispatch} from 'react-redux';
import {incrementCount} from '../../Store/ploggingSlice';
import {getLocation} from './getLocation';
import {TrashItem} from '../../Store/ploggingSlice';
import {trashTypeMapping} from './TrashType';
import AiCamera from './Camera';
interface PloggingDivisionProps {
  name: string;
  onPress?: () => void; // Optional, 모든 division에 필요한 것은 아님
  size?: 'small' | 'medium';
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
const PloggingDivision: React.FC<PloggingDivisionProps> = ({
  name,
  onPress,
  size = 'medium',
}) => {
  const imageSource = getImage(name);
  const dispatch = useDispatch();

  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);

  const handlePress = async (name: string) => {
    if (name === '재활용품' && onPress) {
      onPress();
      return;
    } else if (name === 'AI 쓰레기 인식') {
      setIsCameraModalVisible(true);
      return;
    }
    try {
      const location = (await getLocation()) as {
        latitude: number;
        longitude: number;
      };
      const trashType = trashTypeMapping[name];
      const trashItem: TrashItem = {
        trashType: trashType,
        latitude: location.latitude,
        longitude: location.longitude,
        trash_picture: null,
      };

      dispatch(incrementCount({name, trashItem}));
      console.log('trashItem', trashItem);
    } catch (error) {
      console.log(error);
    }
  };
  const imageSizeStyle =
    size === 'small' ? ImageStyle.smallImage : ImageStyle.mediumImage;
  return (
    <>
      <TouchableOpacity onPress={() => handlePress(name)}>
        <ImageContainer>
          <Image source={imageSource} style={imageSizeStyle} />
        </ImageContainer>
      </TouchableOpacity>
      {isCameraModalVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isCameraModalVisible}
          onRequestClose={() => {
            setIsCameraModalVisible(false);
          }}>
          <AiCamera />
        </Modal>
      )}
    </>
  );
};

export default PloggingDivision;
const ImageContainer = styled.View`
  alignitems: center;
`;
