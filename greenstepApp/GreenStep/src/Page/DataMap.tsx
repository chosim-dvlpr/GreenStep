import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import TextStyle from '../Style/Text';
import PloggingStart from './PloggingStart';
import PloggingMap from './Ploggingmap';
import styled from 'styled-components/native';

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const DataMap = () => {
  const navigation = useNavigation();
  const gotomap = () => {
    navigation.navigate('ploggingstart');
  };
  return (
    <View>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
        <TouchableOpacity onPress={gotomap}>
          <Text>gogo</Text>
        </TouchableOpacity>
      </ContainerBg>
    </View>
  );
};

export default DataMap;
