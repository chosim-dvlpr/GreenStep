package com.mm.greenstep.domain.mypage.service;

import com.mm.greenstep.domain.achieve.entity.UserAchieve;
import com.mm.greenstep.domain.achieve.repository.UserAchieveRepository;
import com.mm.greenstep.domain.common.util.SecurityUtil;
import com.mm.greenstep.domain.mypage.dto.response.MyPageAllPloggingResDto;
import com.mm.greenstep.domain.mypage.dto.response.MyPageDetailHeaderResDto;
import com.mm.greenstep.domain.mypage.dto.response.MyPageDetailStreakResDto;
import com.mm.greenstep.domain.plogging.entity.Plogging;
import com.mm.greenstep.domain.plogging.repository.PloggingRepository;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;
    private final PloggingRepository ploggingRepository;
    private final UserAchieveRepository userAchieveRepository;


    public MyPageDetailHeaderResDto getDetailUserHeader(HttpServletRequest request) {
        Long user_pk = SecurityUtil.getCurrentUserId();

        User user = userRepository.findByUserId(user_pk);

        MyPageDetailHeaderResDto dto = MyPageDetailHeaderResDto.builder()
                .exp(user.getExp())
                .nickname(user.getNickName())
                .level(user.getLevel())
                .build();
        return dto;
    }

    public MyPageAllPloggingResDto getAllUserPlogging() {
        Long user_pk = SecurityUtil.getCurrentUserId();
        User user = userRepository.findByUserId(user_pk);
        List<Plogging> plogging = ploggingRepository.findAllByUser(user);

        // 플로깅 도메인 구현 후 진행
        Integer trashAmount = 0; // 나의 총 쓰레기 량
        Double travelRange = 0.0; // 나의 총 이동거리
        Double travelTime = 0.0; // 나의 총 이동시간

        for (Plogging p : plogging) {
            trashAmount += p.getTrashAmount();
            travelRange += p.getTravelRange();
            travelTime += p.getTravelTime();
        }

        // 완료된 업적 리스트
        List<UserAchieve> list = userAchieveRepository.findAllByUserAndIsBreakedTrue(user);
        Integer completedAchieveCount = 0;
        if(!list.isEmpty()) {
            completedAchieveCount = list.size();
        }

        MyPageAllPloggingResDto dto = MyPageAllPloggingResDto.builder()
                .trashAmount(trashAmount)
                .travelRange(travelRange)
                .travelTime(travelTime)
                .completedAchieveCount(completedAchieveCount)
                .build();
        return dto;
    }

    public Map<Integer, Integer> getDetailStreak(HttpServletRequest request, Integer year) {
        Long user_pk = SecurityUtil.getCurrentUserId();

        User user = userRepository.findByUserId(user_pk);

        // user의 created_at 이 year에 해당하는 plogging을 다 가져오는 jpa 쿼리짜줘
        List<Plogging> ploggingList = ploggingRepository.findByUserAndYear(user, year);

        Map<Integer, Integer> weekOfYearAndTrashCount = new HashMap<>();

        for (Plogging p : ploggingList) {
            // 해당 날짜 그 해의 및 주차인지 판별하는 알고리즘
            TemporalField weekOfYearField = WeekFields.of(Locale.getDefault()).weekOfYear();
            int weekOfYear = p.getCreatedAt().get(weekOfYearField);
            // 기존에 해당 주차에 대한 값이 없다면 0으로 시작합니다.
            int currentCount = weekOfYearAndTrashCount.getOrDefault(weekOfYear, 0);

            // 해당 주차의 count를 1 증가시킵니다.
            weekOfYearAndTrashCount.put(weekOfYear, currentCount + 1);
        }

        return weekOfYearAndTrashCount;
    }
}
