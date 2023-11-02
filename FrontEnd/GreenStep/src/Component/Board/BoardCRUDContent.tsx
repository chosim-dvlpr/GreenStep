import {Text, SafeAreaView, TextInput, StyleSheet, View } from "react-native"
interface contentProps {
    content? : string;
    onChangeText: (text: string) => void;
}
const BoardCRUDContent = (props:contentProps) => {
    return(
        <View style={{marginBottom: 20}}>
            <SafeAreaView>
                <TextInput
                    editable
                    multiline
                    placeholder="내용을 입력하세요"
                    onChangeText={props.onChangeText}
                    value={props.content}
                    style={styles.input}
                    />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 300,
      marginHorizontal: 20,
      marginBottom: 5,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      textAlignVertical: 'top'  
    },
  });
export default BoardCRUDContent;