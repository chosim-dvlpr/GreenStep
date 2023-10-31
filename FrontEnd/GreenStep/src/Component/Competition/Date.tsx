import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 모듈 가져오기
const Date = ({date, onSelectDate, selected}) => {
  moment.locale('ko'); // 한국어로 설정
  /**
   * use moment to compare the date to today
   * 오늘이 아니면 요일표시 ( 예: 월, 화, 수 )
   */
  const day =
    moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? '오늘'
      : moment(date).format('ddd');
  // 요일번호 e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format('D');

  // 전체 날짜 가져오기 예시: 2021-01-01 - 선택 날짜와 비교
  const fullDate = moment(date).format('YYYY-MM-DD');
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card,
        selected === fullDate && {backgroundColor: '#CCE7C9'},
      ]}>
      <Text style={[styles.big, selected === fullDate && {color: '#fff'}]}>
        {day}
      </Text>
      <View style={{height: 10}} />
      <Text
        style={[
          styles.medium,
          selected === fullDate && {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
          },
        ]}>
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderColor: '#ddd',
    paddingTop: 5,
    marginVertical: 25,
    alignItems: 'center',
    height: 65,
    width: 60,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  medium: {
    fontSize: 18,
  },
});
