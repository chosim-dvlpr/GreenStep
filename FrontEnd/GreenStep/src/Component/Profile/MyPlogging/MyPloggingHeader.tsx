import {View, Text} from 'react-native'
import TextStyle from '../../../Style/Text';
const MyPloggingHeader = () =>{
    return(
        <View style={{alignItems:'center', justifyContent:'center', margin: 20}}>
            <Text style={[TextStyle.defaultBlack, {fontSize: 22, fontWeight:'bold'}]}>My Plogging</Text>
        </View>
    )
}
export default MyPloggingHeader;