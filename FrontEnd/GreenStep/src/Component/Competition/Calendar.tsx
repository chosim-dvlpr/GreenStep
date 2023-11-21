// /calendar
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import Date from './Date';

interface CalendarProps {
  onSelectDate: (date: string) => void;
  selected: string | null;
}

const Calendar: React.FC<CalendarProps> = ({onSelectDate, selected}) => {
  const [dates, setDates] = useState<moment.Moment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    selected || moment().format('YYYY-MM-DD'),
  );

  const initializeDates = () => {
    const upcomingDates: moment.Moment[] = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days');
      upcomingDates.push(date);
    }
    setDates(upcomingDates);
  };

  useEffect(() => {
    initializeDates();
    // 오늘 날짜를 선택된 상태로 초기화
    onSelectDate(moment().format('YYYY-MM-DD'));
  }, []);

  return (
    <DateSection>
      <Scroll>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((date, index) => (
            <Date
              key={index}
              date={date}
              onSelectDate={(date: string) => {
                onSelectDate(date);
                setSelectedDate(date);
              }}
              selected={selectedDate}
            />
          ))}
        </ScrollView>
      </Scroll>
    </DateSection>
  );
};

export default Calendar;

const DateSection = styled.View`
  width: 100%;
  padding: 10px;
`;

const Scroll = styled.View`
  height: 110px;
`;
