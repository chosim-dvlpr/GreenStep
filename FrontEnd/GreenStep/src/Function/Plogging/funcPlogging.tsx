import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { useState } from 'react';

// travelRange 반올림 처리
export const roundedTravelRange = (range: Double): number => {
    return Math.round(range * 100) / 100;
};
// 시/분 표시
export const msToHM = (duration: Double): string => {
    let seconds: string | number = Math.floor((duration / 1000) % 60),
        minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
        hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}H ${minutes}M`;
    };
// 시/분/초 표시
export const msToHMS = (duration: Double): string => {
    let seconds: string | number = Math.floor((duration / 1000) % 60),
        minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
        hours: string | number = Math.floor(duration / (1000 * 60 * 60));

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
    };

// 날짜 형식 변경
export const formatDate = (dateString: string): {datePart: string, timePart: string} => {
    const date = new Date(dateString);
    // return date.toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    
    const formattedDate = date.toLocaleString('ko-KR', options);
    const dayIndex = formattedDate.indexOf('오전');
    const nightIndex = formattedDate.indexOf('오후');

    let datePart: string;
    let timePart: string;
    // const [datePart, setDatePart] = useState<string>("");
    // const [timePart, setTimePart] = useState<string>("");
    
    if (dayIndex > -1) { // 오전일 때
        datePart = formattedDate.substring(0, dayIndex);
        timePart = formattedDate.substring(dayIndex);
    } else {
        datePart = formattedDate.substring(0, nightIndex);
        timePart = formattedDate.substring(nightIndex);
    }
    // const [datePart, timePart] = formattedDate.split(',');
    console.log(datePart, timePart)
    // return `${datePart}\n${timePart}`;
    return { datePart: datePart, timePart: timePart}
};