import { View } from "react-native"
import MyPloggingHeader from "../Component/Profile/MyPlogging/MyPloggingHeader";
import MyPloggingList from "../Component/Profile/MyPlogging/MyPloggingList";
import styled from "styled-components/native";

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const MyPlogging = () => {
    return(
        <View>
            <ContainerBg source={require('../Image/Competition/bg.png')}>
                <MyPloggingHeader/>
                <MyPloggingList/>
            </ContainerBg>
        </View>
    )
}
export default MyPlogging;