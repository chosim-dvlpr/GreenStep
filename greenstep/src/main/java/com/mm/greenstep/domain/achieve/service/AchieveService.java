package com.mm.greenstep.domain.achieve.service;

import com.mm.greenstep.domain.achieve.entity.Achieve;
import com.mm.greenstep.domain.achieve.entity.UserAchieve;
import com.mm.greenstep.domain.achieve.repository.AchieveRepository;
import com.mm.greenstep.domain.achieve.repository.UserAchieveRepository;
import com.mm.greenstep.domain.achieve.dto.response.AchieveDetailResDto;
import com.mm.greenstep.domain.plogging.entity.Plogging;
import com.mm.greenstep.domain.plogging.repository.PloggingRepository;
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
    private final UserAchieveRepository userAchieveRepository; // 내 업적 레포
    private final AchieveRepository achieveRepository; // 업적들 레포
    private final PloggingRepository ploggingRepository;

    public List<AchieveDetailResDto> getDetailAchieve(HttpServletRequest request, Byte achieveType) {
        Long user_pk = 100L;

        User user = userRepository.findByUserId(user_pk);
        List<UserAchieve> userAchieveList = userAchieveRepository.findAllByUser(user);
        List<AchieveDetailResDto> list = new ArrayList<>();

        // 타입에 맞는 업적을 가져온다.
        List<Achieve> achieveList = achieveRepository.findAllByAchieveType(achieveType);

        // 업적들을 돌면서 나의 플로깅 이력을 다가져오기
        List<Plogging> plogging = ploggingRepository.findAllByUser(user);
        Integer myTrashAmount = 0; // 나의 총 쓰레기 량
        Double myTravelRange = 0.0; // 나의 총 이동거리
        Double myTravelTime = 0.0; // 나의 총 이동시간

        for (Plogging p : plogging) {
            myTrashAmount += p.getTrashAmount();
            myTravelRange += p.getTravelRange();
            myTravelTime += p.getTravelTime();
        }

        Integer achieveTrashAmount; // 해당 업적 쓰레기 량
        Double achieveTravelRange; // 해당 업적 이동거리
        Double achieveTravelTime; // 해당 업적 이동시간



//        switch (achieveType) {
//                // 거리
//            case 1:
//                for (Plogging p : plogging) {
//                    myTravelRange += p.getTravelRange();
//                }
//
//                for (Achieve a: achieveList) {
//                    AchieveDetailResDto dto = AchieveDetailResDto.builder()
//                            .achieveTravelRange(a.getAchieveDistance())
//                            .achieveName(a.getAchieveName())
//                            .
//                            .build();
//                }
//
//                // 나의 모든 플로깅 이동거리를 가져온다
//                // 가져온 애들이랑 해당 업적의 이동거리를 비교하고 계산해서 진행률을 넣어준다. 계산해서 100%가 넘어가면 달성 여부와 달성 일자를 업데이트해준다.
//                break;
//                // 시간
//            case 2:
//                // 나의 모든 플로깅 이동시간을 가져온다
//                break;
//                // 쓰레기 수
//            case 3:
//                // 나의 모든 쓰레기수를 가져온다
//                break;
//                // 횟수
//            case 4:
//                // 나의 모든 플로깅 횟수를 가져온다
//                break;
//        }

        for (UserAchieve userAchieve : userAchieveList) {
            AchieveDetailResDto dto = AchieveDetailResDto.builder()
                    .achieveImg(userAchieve.getAchieve().getAchieveImage())
                    .achieveName(userAchieve.getAchieve().getAchieveName())
                    .createdAt(userAchieve.getCreatedAt())
//                    .progresses(progresses)
                    .build();
            list.add(dto);
        }
        return list;
    }
}
