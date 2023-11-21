import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';

// 로딩 인디케이터를 표시하는 컴포넌트 예시
const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
