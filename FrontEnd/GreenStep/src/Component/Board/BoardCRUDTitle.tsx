import { View, SafeAreaView, TextInput, StyleSheet, Text } from "react-native"

interface titleProps {
  title? : string;
  onChangeText: (text: string) => void;
}

const BoardCRUDTitle = (props:titleProps) => {
  return(
    <View style={{marginTop: 20, padding: 10,}}>
      <SafeAreaView>
        <TextInput 
        style={styles.input} 
        placeholder="제목"
        placeholderTextColor="black"
        onChangeText={props.onChangeText} 
        value={props.title} />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 20,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
  },
});

export default BoardCRUDTitle;