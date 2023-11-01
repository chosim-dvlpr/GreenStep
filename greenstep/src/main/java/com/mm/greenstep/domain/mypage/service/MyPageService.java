package com.mm.greenstep.domain.mypage.service;

import com.mm.greenstep.domain.mypage.dto.MyPageAllPloggingResponseDto;
import com.mm.greenstep.domain.mypage.dto.MyPageDetailHeaderResponseDto;
import com.mm.greenstep.domain.mypage.dto.MyPageDetailStreakResponseDto;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;

    public MyPageDetailHeaderResponseDto getDetailUserHeader(HttpServletRequest request) {
//        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        Long user_pk = 100L;

        User user = userRepository.findByUserId(user_pk);

        MyPageDetailHeaderResponseDto dto = MyPageDetailHeaderResponseDto.builder()
                .exp(user.getExp())
                .nickname(user.getNickName())
                .level(user.getLevel())
                .build();
        return dto;
    }

    public MyPageAllPloggingResponseDto getAllUserPlogging(HttpServletRequest request) {
        Long user_pk = 100L;

        User user = userRepository.findByUserId(user_pk);

        // 플로깅 도메인 구현 후 진행
        // 나의 모든 플로깅에서 다 뽑고 계산해서 넣어주면 됨
        Long trashAmount = null; // 나의 총 쓰레기 량
        Double travelRange = null; // 나의 총 이동거리
        Long travelTime = null; // 나의 총 이동시간

        MyPageAllPloggingResponseDto dto = MyPageAllPloggingResponseDto.builder()
                .trashAmount(trashAmount)
                .travelRange(travelRange)
                .travelTime(travelTime)
                .build();
        return dto;
    }

    public List<MyPageDetailStreakResponseDto> getDetailStreak(HttpServletRequest request, Integer year) {
        Long user_pk = 100L;

        User user = userRepository.findByUserId(user_pk);

        // 플로깅 도메인 구현 후 진행
        // 년도를 받아서 그 년도에 해당하는 플로깅내역을 다 가져와서 몇 월달의 몇주차에 해당하는 쓰레기를 계산해서 넣어주면 됨
        // 몇월인지
        Integer month = null;
        // 몇주차인지
        Integer weekly = null;
        // 몇개의 쓰레기를 주웠는지
        Long count = null;

        // 년도와 userid로 모든 플로깅내역을 찾아온다
        //
//        List<MyPageDetailStreakResponseDto> dto = MyPageDetailStreakResponseDto.builder()
//                .
//                .build();
//        return dto;
        return null;
    }
}
