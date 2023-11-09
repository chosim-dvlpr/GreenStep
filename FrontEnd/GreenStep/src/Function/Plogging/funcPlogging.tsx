import { Double } from 'react-native/Libraries/Types/CodegenTypes';

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
    
        return `${hours}:${minutes}`;
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
    export const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    };