import { View, Text, ViewStyle, Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { pageWidth } from './Carousel';

interface CarouselCardItemProps {
  item: {
    key: number; 
    color: string;
    imageUrl: string;
  };
  style: ViewStyle;
}

const PageItem = styled.View<{color: string}>`
  justify-content: center;
  align-items: center;
  flex: 1;
`;


const CarouselCardItem = ({item, style}: CarouselCardItemProps) => {
  return (
    <View>
      <PageItem color={item.color} style={style}>
        <Image 
        source={{uri: item.imageUrl}}
        style={{flex: 1, width: pageWidth, height: 100, resizeMode: 'cover', borderRadius: 20}}
        ></Image>
      </PageItem>
    </View>
  )
};

export default CarouselCardItem;