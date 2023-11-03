import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import PloggingDivision from './PloggingDivision';

const PloggingFooter = () => {
  return (
    <View style={styles.footer}>
      <PloggingDivision />
      <PloggingDivision />
      <PloggingDivision />
    </View>
  );
};

export default PloggingFooter;
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    zIndex: 10,
    width: 397,
    height: 106,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
