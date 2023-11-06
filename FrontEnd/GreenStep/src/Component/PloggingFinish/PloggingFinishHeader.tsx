import { View, Text, Image } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import PloggingFinishStamp from '../../Image/Plogging/PloggingFinishStamp.png'
import ImageStyle from '../../Style/Image'

const HeaderText = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: black;
`
const HeaderTextContainer = styled.View`
  margin-top: 60;
  margin-left: 30;
`
const HeaderSubText = styled.Text`
  font-size: 15;
  text-align: right;
  color: black;
  margin-right: 30;
`

const PloggingFinishHeader = () => {
  return (
    <View>
      <Image
      source={PloggingFinishStamp}
      style={[ImageStyle.StampImage]}
      />
      <HeaderTextContainer>
        <HeaderText>오늘도 해냈어요!</HeaderText>
        <HeaderSubText>+78exp</HeaderSubText>
      </HeaderTextContainer>
    </View>
  )
}

export default PloggingFinishHeader