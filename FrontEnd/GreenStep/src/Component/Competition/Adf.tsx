import {useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Calendar from './Calendar';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={styles.container}>
      <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
