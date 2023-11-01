package com.mm.greenstep.domain.achieve.service;

import com.mm.greenstep.domain.achieve.entity.Achieve;
import com.mm.greenstep.domain.achieve.entity.UserAchieve;
import com.mm.greenstep.domain.achieve.repository.AchieveRepository;
import com.mm.greenstep.domain.achieve.repository.UserAchieveRepository;
import com.mm.greenstep.domain.achieve.dto.response.AchieveDetailResponseDto;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AchieveService {

    private final UserRepository userRepository;
    private final UserAchieveRepository userAchieveRepository;
    private final AchieveRepository achieveRepository;

    public List<AchieveDetailResponseDto> getDetailAchieve(HttpServletRequest request, Byte achieveType) {
        Long user_pk = 100L;

        User user = userRepository.findByUserId(user_pk);
        List<UserAchieve> userAchieveList = userAchieveRepository.findAllByUser(user);
        List<AchieveDetailResponseDto> list = new ArrayList<>();

        // 타입에 맞는 업적을 가져온다.
        List<Achieve> achieveList = achieveRepository.findAllByAchieveType(achieveType);

        Integer progresses = 0;

        switch (achieveType) {
                // 거리
            case 1:
                // 나의 모든 플로깅 이동거리를 가져온다

                // 가져온 애들이랑 해당 업적의 이동거리를 비교하고 계산해서 진행률을 넣어준다. 계산해서 100%가 넘어가면 달성 여부와 달성 일자를 업데이트해준다.
                break;
                // 시간
            case 2:
                // 나의 모든 플로깅 이동시간을 가져온다
                break;
                // 쓰레기 수
            case 3:
                // 나의 모든 쓰레기수를 가져온다
                break;
                // 횟수
            case 4:
                // 나의 모든 플로깅 횟수를 가져온다
                break;
        }

        for (UserAchieve userAchieve : userAchieveList) {
            AchieveDetailResponseDto dto = AchieveDetailResponseDto.builder()
                    .achieveImg(userAchieve.getAchieve().getAchieveImage())
                    .achieveName(userAchieve.getAchieve().getAchieveName())
                    .createdAt(userAchieve.getCreatedAt())
                    .progresses(progresses)
                    .build();
            list.add(dto);
        }
        return list;
    }
}
