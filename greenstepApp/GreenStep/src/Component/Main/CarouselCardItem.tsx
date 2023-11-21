import { View, ViewStyle, Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { pageWidth, PagesObjectType } from './Carousel';

interface CarouselCardItemProps {
  item: PagesObjectType;
  style: ViewStyle;
}

const PageItem = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;


const CarouselCardItem = ({item, style}: CarouselCardItemProps) => {
  return (
    <View>
      <PageItem style={[style, {backgroundColor: 'black', borderRadius: 20}]}>
        <Image 
        source={{uri: item.imageUrl}}
        style={{flex: 1, width: pageWidth, height: 100, resizeMode: 'cover', borderRadius: 20, opacity: 0.6}}
        ></Image>
      </PageItem>
    </View>
  )
};

export default CarouselCardItem;