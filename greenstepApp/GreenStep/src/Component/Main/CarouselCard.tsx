import { FlatList } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import CarouselCardItem from './CarouselCardItem';
import styled from 'styled-components/native';
import { PagesObjectType, PagesType } from './Carousel';

interface CarouselCardProps {
  gap: number;
  offset: number;
  pages: PagesType;
  setPages: Dispatch<SetStateAction<PagesType>>;
  pageWidth: number;
}

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CarouselCard = ({
  pages, 
  setPages, 
  pageWidth, 
  gap, 
  offset}: CarouselCardProps) => {
  
  function renderItem({item}: { item: PagesObjectType }) {
    return (
      <CarouselCardItem 
      item={item} 
      style={{width: pageWidth, marginHorizontal: gap / 2}} 
      />
    );
  }

  // 시작 인덱스
  const flatListRef = useRef<FlatList>(null);
  useEffect( () => {
    if (pages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index: 1 });
    }
  },[pages])

  // 끝에 도달하면 리스트 반복해서 보여줌
  const onDataFetchEnd = () => {
    console.log('업데이트')
    setPages([...pages, ...pages]);
  }
  // const onDataFetchStart = async () => {
  //   console.log('업데이트')
  //   const newData: PagesType = [...pages]; // 기존 데이터를 복사하여 새로운 배열 생성
  //   newData.unshift(...pages); // 기존 데이터를 배열의 앞에 추가
  //   console.log(newData);
  //   setPages(newData);
  // }

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        getItemLayout={(data, index) => (
          { length: pageWidth + gap, offset: (pageWidth + gap) * index, index }
        )}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any, idx) => `page__${item.imageUrl}_${idx}`}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        // onStartReached={onDataFetchStart}
        onEndReached={onDataFetchEnd} // scroll 위치가 onEndReachedThreshold 범위에 들어오면 함수를 실행 (무한 스크롤)
        onEndReachedThreshold={1}
        // ListEmptyComponent : List가 비어 있을 때 rendering (로딩 시 스켈레톤을 넣을 때 사용 가능)
      />
    </Container>
  );
};

export default CarouselCard;