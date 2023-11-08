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
  const onDataFetch = () => {
    console.log('업데이트')
    setPages([...pages, ...pages]);
  }

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
        keyExtractor={(item: any) => `page__${item.imageUrl}`}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onEndReached={onDataFetch} // scroll 위치가 onEndReachedThreshold 범위에 들어오면 함수를 실행 (무한 스크롤)
        onEndReachedThreshold={1}
        // ListEmptyComponent : List가 비어 있을 때 rendering (로딩 시 스켈레톤을 넣을 때 사용 가능)
      />
    </Container>
  );
};

export default CarouselCard;