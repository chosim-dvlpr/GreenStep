import { View, ViewStyle, Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { pageWidth, PagesObjectType } from './Carousel';

interface CarouselCardItemProps {
  // item: {
  //   key: number; 
  //   // color: string;
  //   imageUrl: string;
  // };
  item: PagesObjectType;
  style: ViewStyle;
}

// const PageItem = styled.View<{color: string}>`
const PageItem = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;


const CarouselCardItem = ({item, style}: CarouselCardItemProps) => {
  return (
    <View>
      <PageItem style={style}>
        <Image 
        source={{uri: item.imageUrl}}
        style={{flex: 1, width: pageWidth, height: 100, resizeMode: 'cover', borderRadius: 20}}
        ></Image>
      </PageItem>
    </View>
  )
};

export default CarouselCardItem;