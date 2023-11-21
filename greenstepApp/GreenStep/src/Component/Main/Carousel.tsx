import { View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import CarouselCard from './CarouselCard'
import { MainAPI } from '../../Api/basicHttp';
import { useIsFocused } from '@react-navigation/native';

export interface PagesObjectType {
  imageUrl: string;
};

export interface PagesType extends Array<PagesObjectType> {}

// Carousel 모양 지정
const screenWidth = Math.round(Dimensions.get('window').width); // 393
const gap = 20;    // 캐러셀 사이의 간격
const offset = 60; // 다음 캐러셀 / 이전 캐러셀이 보여지는 너비
export const pageWidth = screenWidth - (gap + offset) * 2; // 캐러셀 너비


const Carousel = () => {
  const isFocused = useIsFocused();

  /** 플로깅 이미지 불러오기 */
  const [pages, setPages] = useState<PagesType>([]);

   useEffect(() => {
    return() => {
      getMainImage();
    }
   }, [isFocused])

   useEffect(() => {
    getMainImage();
   }, [])
   
   const getMainImage = () => {
    MainAPI.mainImageAxios()
    .then(res => {
      if (res.status === 200) {
        setPages(res.data)
      }
    })
    .catch(err => console.log('캐러셀 이미지 axios 에러 : ', err))
  }


  return (
    <View style={{height: "100%", width: "100%"}}>
      <CarouselCard
        gap={gap}
        offset={offset}
        pages={pages}
        setPages={setPages}
        pageWidth={pageWidth}
        />
    </View>
  );
};

export default Carousel;