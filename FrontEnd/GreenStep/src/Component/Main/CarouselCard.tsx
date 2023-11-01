import { View, Text, Dimensions, FlatList } from 'react-native';
import React, { useState } from 'react';
import CarouselCardItem from './CarouselCardItem';
import styled from 'styled-components/native';
import { samplePagesType } from './Carousel';

interface CarouselCardProps {
  gap: number;
  offset: number;
  pages: samplePagesType;
  pageWidth: number;
}

const Container = styled.View`
  height: 80%;
  justify-content: center;
  align-items: center;
`;

const CarouselCard = ({pages, pageWidth, gap, offset}: CarouselCardProps) => {
  
  function renderItem({item}: any) {
    return (
      <CarouselCardItem item={item} style={{width: pageWidth, marginHorizontal: gap / 2}} />
    );
  }

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.color}`}
        // onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default CarouselCard;