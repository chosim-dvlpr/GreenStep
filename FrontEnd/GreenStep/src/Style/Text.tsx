import {StyleSheet} from 'react-native';

const TextStyle = StyleSheet.create({
  /** 검정 텍스트 */
  //플로깅종료 화면 상단, 플로깅 시작화면(info 시간 거리 쓰레기)
  defaultBlack: {
    color: '#000000',
  },
  /** 회색 텍스트 */
  //플로깅 진행 중의 쓰레기 버튼, 모달의

  defaultGray: {
    color: '#ADADAD',
  },
  /** 하얀색 텍스트 */
  //프로깅 종료시 사진 업로드 이미지
  defaultWhite: {
    color: '#FFF',
  },
});

export default TextStyle;
