import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import ButtonStyle from '../../Style/ButtonStyle';
import { GestureResponderEvent } from 'react-native';

interface CustomButtonType {
    title: string;
    styleType: keyof typeof ButtonStyle;
    backgroundColor?: string;
    color?: string;
    fontSize?: number;
    func?: ((event: GestureResponderEvent) => void);
}

const CustomButton = ({ title, styleType, backgroundColor, color, fontSize, func}: CustomButtonType) => {
    return (
        <TouchableOpacity style={[ButtonStyle[styleType],
                                { backgroundColor: backgroundColor }]}
                          onPress={func}
                                >
          <Text style={{ color: color, fontSize: fontSize }}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;

// 사용예시 - 타 페이지

// import CustomButton from '../Component/Common/CustomButton';

//     <View>
//       <CustomButton title='시간' styleType='smallButton' backgroundColor='#1EFF00' color='#5BB450' fontSize={24}></CustomButton>
//     </View>

