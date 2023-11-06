import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components/native';

const Date = ({date, onSelectDate, selected}: any) => {
  moment.locale('ko');

  const formattedDate = moment(date).format('YYYY-MM-DD');
  const isToday = formattedDate === moment().format('YYYY-MM-DD');
  const isSelected = selected === formattedDate;

  const day = isToday ? '오늘' : moment(date).format('ddd');
  const dayNumber = moment(date).format('D');

  return (
    <DateCard onPress={() => onSelectDate(formattedDate)} selected={isSelected}>
      <DayText selected={isSelected}>{day}</DayText>
      <Spacer height={10} />
      <DayNumberText selected={isSelected}>{dayNumber}</DayNumberText>
    </DateCard>
  );
};

export default Date;

const DateCard = styled(TouchableOpacity)<{selected: boolean}>`
  border-radius: 10px;
  border-color: #ddd;
  padding-top: 5px;
  margin-vertical: 25px;
  align-items: center;
  height: 65px;
  width: 60px;
  margin-horizontal: 5px;
  background-color: ${props => (props.selected ? '#99D959' : 'transparent')};
`;

const DayText = styled(Text)<{selected: boolean}>`
  font-family: 'SUITE-Bold';
  font-size: 19px;
  color: ${props => (props.selected ? '#fff' : 'black')};
`;

const Spacer = styled(View).attrs<{height: number}>(props => ({
  height: props.height || 10,
}))`
  height: ${(props: {height: number}) => props.height}px;
`;

const DayNumberText = styled(Text)<{selected: boolean}>`
  font-family: 'SUITE-Bold';
  font-size: ${props => (props.selected ? 20 : 18)}px;
  color: ${props => (props.selected ? '#fff' : 'black')};
`;
