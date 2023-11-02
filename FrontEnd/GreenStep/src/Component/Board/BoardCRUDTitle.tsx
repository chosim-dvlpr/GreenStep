import { View, SafeAreaView, TextInput, StyleSheet, Text } from "react-native"

interface titleProps {
    title? : string;
    onChangeText: (text: string) => void;
}

const BoardCRUDTitle = (props:titleProps) => {
    return(
        <View>
        <SafeAreaView>
            <TextInput style={styles.input} placeholder="제목"
                       onChangeText={props.onChangeText} value={props.title} />
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
    },
  });

export default BoardCRUDTitle;