import { View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import CarouselCard from './CarouselCard'

interface samplePagesObjectType {
  key: number;
  color?: string;
  imageUrl: string;
};

export interface samplePagesType extends Array<samplePagesObjectType> {}

// Carousel 모양 지정
const screenWidth = Math.round(Dimensions.get('window').width); // 393
const gap = 20;    // 캐러셀 사이의 간격
const offset = 60; // 다음 캐러셀 / 이전 캐러셀이 보여지는 너비
export const pageWidth = screenWidth - (gap + offset) * 2; // 캐러셀 너비


const Carousel = () => {
  // 임시 데이터
  const [samplePages, setSamplePages] = useState<samplePagesType> ([
    {
      key: 1,
      color: '#86E3CE',
      imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfNjIg/MDAxNjEyNDA4OTk5NDQ4.6UGs399-0EXjIUwwWsYg7o66lDb-MPOVQ-zNDy1Wnnkg.m-WZz0IKKnc5OO2mjY5dOD-0VsfpXg7WVGgds6fKwnIg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D2.jpg?type=w800',
    },
    {
      key: 2,
      color: '#D0E6A5',
      imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfNjIg/MDAxNjEyNDA4OTk5NDQ4.6UGs399-0EXjIUwwWsYg7o66lDb-MPOVQ-zNDy1Wnnkg.m-WZz0IKKnc5OO2mjY5dOD-0VsfpXg7WVGgds6fKwnIg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D2.jpg?type=w800',
    },
    {
      key: 3,
      color: '#FFDD94',
      imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfNjIg/MDAxNjEyNDA4OTk5NDQ4.6UGs399-0EXjIUwwWsYg7o66lDb-MPOVQ-zNDy1Wnnkg.m-WZz0IKKnc5OO2mjY5dOD-0VsfpXg7WVGgds6fKwnIg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D2.jpg?type=w800',
    },
    {
      key: 4,
      color: '#FA897B',
      imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfNjIg/MDAxNjEyNDA4OTk5NDQ4.6UGs399-0EXjIUwwWsYg7o66lDb-MPOVQ-zNDy1Wnnkg.m-WZz0IKKnc5OO2mjY5dOD-0VsfpXg7WVGgds6fKwnIg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D2.jpg?type=w800',
    },
    {
      key: 5,
      color: '#CCABD8',
      imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfNjIg/MDAxNjEyNDA4OTk5NDQ4.6UGs399-0EXjIUwwWsYg7o66lDb-MPOVQ-zNDy1Wnnkg.m-WZz0IKKnc5OO2mjY5dOD-0VsfpXg7WVGgds6fKwnIg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D2.jpg?type=w800',
    },
  ]);

  return (
    <View style={{height: "100%", width: "100%"}}>
      <CarouselCard
        gap={gap}
        offset={offset}
        pages={samplePages}
        setSamplePages={setSamplePages}
        pageWidth={pageWidth}
        />
    </View>
  );
};

export default Carousel;