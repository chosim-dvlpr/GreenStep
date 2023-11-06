import {StyleSheet} from 'react-native';

const ImageStyle = StyleSheet.create({
  /** 가장 작은 크기의 이미지,
  FooterBar, 게시판 참여 유저 이미지 */
  tinyImage: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 3,
  },
  /** 작은 크기의 이미지,
  플로깅데이터(3칸짜리), 플로깅 진행 중 화면의 시작, 종료 버튼 이미지 */
  smallImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 3,
  },
  /** 중간 크기의 이미지,
  플로깅 진행 중의 쓰레기 버튼, 모달의 재활용 버튼, 업적 모달의 업적 뱃지,
  프로필, 업적 카드, 도장, 게시판 리스트 카드 이미지 */
  mediumImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 3,
  },
  /** 큰 크기의 이미지,
    프로깅 종료시 사진 업로드 이미지 */
  largeImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  /** 캐릭터 이미지,
  프로깅 종료시 사진 업로드 이미지 */
  AvatarImage: {
    width: 100,
    height: 100,
    // resizeMode: 'cover',
  },
  /** 플로깅 종료 시 나오는 도장 이미지 */
  StampImage: {
    position: 'absolute', 
    top: '20%',
    right: '16%',
    width: 100, 
    height: 100,
    zIndex: 1,
  }
})

export default ImageStyle;
