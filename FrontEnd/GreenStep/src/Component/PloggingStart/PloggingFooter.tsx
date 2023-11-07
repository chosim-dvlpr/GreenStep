import {View, Text, StyleSheet, Modal} from 'react-native';
import React, {useState} from 'react';
import PloggingDivision from './PloggingDivision';
import PloggingModal from './PloggingModal';
interface PloggingFooterProps {
  openModal: () => void;
}
const PloggingFooter: React.FC<PloggingFooterProps> = ({openModal}) => {
  return (
    <View style={styles.footer}>
      <PloggingDivision name="AI 쓰레기 인식" />
      <PloggingDivision name="일반쓰레기" />
      <PloggingDivision name="재활용품" onPress={openModal} />
    </View>
  );
};

export default PloggingFooter;
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    zIndex: 10,
    width: 400,
    height: 125,
    bottom: 0,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
