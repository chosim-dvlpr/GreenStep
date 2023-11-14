import { StyleSheet } from "react-native"

const ButtonStyle = StyleSheet.create({
  /** 작은 크기의 버튼
   * 크루찾기 메인 - 글 쓰기
   * 플로깅 종료 후 업적 모달 - 확인 버튼
   * 업적카테고리 버튼
   */
  smallButton: {
    width: 90,
    height: 45,          
    borderRadius: 15,
    alignItems : 'center',
    justifyContent: 'center'
  },
    /** 중간 크기의 버튼
     * 플로깅 중 모달 - 등록버튼
     * 메인페이지 -플로깅 하기 
     */
    middleButton: {
        width: '60%',
        height: 55,
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderRadius: 15,
        alignItems : 'center',
        justifyContent: 'center'
      },
  /** 큰 크기의 버튼
   * 가로 길이 꽉차는 버튼
   * 플로깅 종료 - 인증하기 버튼
   * 크루찾기 - 참여하기, 글 쓰기
   */
  largeButton: {
    width: '90%', 
    height: 60,       
    borderRadius: 15,
    alignItems : 'center',
    justifyContent: 'center',
  },
  /** 너비 100%의 꽉차는 버튼 */
  fullLargeButton: {
    width: '100%', 
    height: 60,       
    borderRadius: 15,
    alignItems : 'center',
    justifyContent: 'center',
  },
  /** 카카오 로그인 버튼 */
  kakaoButton: {
    // backgroundColor: '#FEE500',
    height: 50,
    borderRadius: 12,
    alignItems : 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  /** 업적 페이지 작은 버튼 */
  achievementButton: {
    backgroundColor: '#8BCA84',
  },
  /** 버튼 색 - 연초록 */
  lightGreenColor: {
    backgroundColor: '#ACD8A7',
    elevation: 5,
  },
  /** 버튼 색 - 흰색 */
  whiteColor: {
    backgroundColor: 'white',
    elevation: 5, // 그림자
  },
})

export default ButtonStyle;