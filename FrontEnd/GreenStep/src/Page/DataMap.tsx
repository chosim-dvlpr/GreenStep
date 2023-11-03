import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import TextStyle from '../Style/Text';
import PloggingStart from './PloggingStart';
import PloggingMap from './Ploggingmap';

const DataMap = () => {
  const navigation = useNavigation();
  const gotomap = () => {
    navigation.navigate('ploggingstart');
  };
  return (
    <View>
      <TouchableOpacity onPress={gotomap}>
        <Text>gogo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DataMap;
