import {TouchableOpacity, Image, Modal} from 'react-native';
import React, {useState} from 'react';
//스타일
import styled from 'styled-components/native';
import ImageStyle from '../../Style/Image';

//상태관리
import {useDispatch} from 'react-redux';
import {incrementCount} from '../../Store/ploggingSlice';

//훅
import {getLocation} from './Hook/useLocationTracker';
import {TrashItem} from '../../Store/ploggingSlice';
import {trashTypeMapping} from './TrashType';

// 컴포넌트
import AiCamera from './Camera';
interface PloggingDivisionProps {
  name: string;
  onPress?: () => void; // Optional, 모든 division에 필요한 것은 아님
  size?: 'small' | 'medium';
  isTracking: boolean;
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
  isTracking,
}) => {
  const imageSource = getImage(name);
  const dispatch = useDispatch();

  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  console.log(isTracking);

  const handlePress = async (name: string) => {
    if (!isTracking) return;
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
          <AiCamera onClose={() => setIsCameraModalVisible(false)} />
        </Modal>
      )}
    </>
  );
};

export default PloggingDivision;
const ImageContainer = styled.View`
  alignitems: center;
`;
