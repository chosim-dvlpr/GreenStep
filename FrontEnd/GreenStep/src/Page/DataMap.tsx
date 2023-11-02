import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const DataMap = () => {
  const navigation = useNavigation();
  const gotomap = () => {
    navigation.navigate('ploggingstart');
  };
  return (
    <View>
      <Text>DataMap</Text>

      <TouchableOpacity onPress={gotomap}>
        <Text>gogo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DataMap;
