import { StyleSheet } from 'react-native'

const Box = StyleSheet.create({
  /** 플로깅 진행 중 화면 위쪽의 정보 박스 */
  ploggingInfoBox: {
    width: '100%',
    padding: 20,
    backgroundColor: 'lightgreen',
    borderRadius: 20,
  },
  /** 플로깅 데이터 (세개짜리) 하나하나의 박스 */
  ploggingDataInfoBox: {
    width: '30%',
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 20,
  },
  /** 업적 리스트, 게시글 리스트 박스 */
  cardBox: {
    width: '100%',
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  /** 내가 작성한 게시글 박스 */
  mediumCardBox: {
    width: '30%',
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 15,
  },
  /** 경쟁 기여도 부분 초록색 박스 */
  competitionBox: {
    width: '100%',
    padding: 30,
    backgroundColor: 'gray',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
})

export default Box;


