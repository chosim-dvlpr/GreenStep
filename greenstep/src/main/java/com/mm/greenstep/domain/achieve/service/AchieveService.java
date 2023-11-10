package com.mm.greenstep.domain.achieve.service;

import com.mm.greenstep.domain.achieve.entity.Achieve;
import com.mm.greenstep.domain.achieve.entity.UserAchieve;
import com.mm.greenstep.domain.achieve.repository.AchieveRepository;
import com.mm.greenstep.domain.achieve.repository.UserAchieveRepository;
import com.mm.greenstep.domain.achieve.dto.response.AchieveDetailResDto;
import com.mm.greenstep.domain.common.util.SecurityUtil;
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
    private final PloggingRepository ploggingRepository;
    private final AchieveRepository achieveRepository;


    public List<AchieveDetailResDto> getDetailAchieve(Byte achieveType) {
        Long user_pk = SecurityUtil.getCurrentUserId();

        User user = userRepository.findByUserId(user_pk);

        // 해당하는 업적들만 가져오기
        List<UserAchieve> userAchieveList = userAchieveRepository.findAllByUserAndAchieve_AchieveType(user, achieveType);

        List<AchieveDetailResDto> list = new ArrayList<>();

        // 업적들을 돌면서 나의 플로깅 이력을 다가져오기
        List<Plogging> plogging = ploggingRepository.findAllByUser(user);
        Integer myTrashAmount = 0; // 나의 총 쓰레기 량
        Double myTravelRange = 0.0; // 나의 총 이동거리
        Double myTravelTime = 0.0; // 나의 총 이동시간

        switch (achieveType) {
            // 거리
            case 0:
                for (Plogging p : plogging) {
                    if(p.getTravelRange() == null) continue;
                    myTravelRange += p.getTravelRange();
                }
                for (UserAchieve a: userAchieveList) {
                    AchieveDetailResDto dto = AchieveDetailResDto.builder()
                            .achieveTravelRange(a.getAchieve().getAchieveDistance()) // 업적의 이동거리
                            .achieveName(a.getAchieve().getAchieveName()) // 업적 이름
                            .myTravelRange(myTravelRange) // 내 이동 거리
                            .createdAt(a.getCreatedAt())
                            .build();

                    list.add(dto);
                }
                break;
            // 시간
            case 1:
                for (Plogging p : plogging) {
                    if(p.getTravelTime() == null) continue;
                    myTravelTime += p.getTravelTime();
                }
                for (UserAchieve a: userAchieveList) {
                    AchieveDetailResDto dto = AchieveDetailResDto.builder()
                            .achieveTravelTime(a.getAchieve().getAchieveTime()) // 업적의 이동거리
                            .achieveName(a.getAchieve().getAchieveName()) // 업적 이름
                            .myTravelTime(myTravelTime) // 내 이동 거리
                            .createdAt(a.getCreatedAt())
                            .build();

                    list.add(dto);
                }
                break;
            // 쓰레기 수
            case 2:
                for (Plogging p : plogging) {
                    if(p.getTrashAmount() == null) continue;
                    myTrashAmount += p.getTrashAmount();
                }
                for (UserAchieve a: userAchieveList) {
                    AchieveDetailResDto dto = AchieveDetailResDto.builder()
                            .achieveTrashAmount(a.getAchieve().getAchieveTrash()) // 업적의 이동거리
                            .achieveName(a.getAchieve().getAchieveName()) // 업적 이름
                            .myTrashAmount(myTrashAmount) // 내 이동 거리
                            .createdAt(a.getCreatedAt())
                            .build();

                    list.add(dto);
                }
                break;
            // 횟수
            case 3:
                for (UserAchieve a: userAchieveList) {
                    AchieveDetailResDto dto = AchieveDetailResDto.builder()
                            .achievePloggingCount(a.getAchieve().getAchieveCount()) // 업적의 이동거리
                            .achieveName(a.getAchieve().getAchieveName()) // 업적 이름
                            .myPloggingCount(plogging.size()) // 내 이동 거리
                            .createdAt(a.getCreatedAt())
                            .build();

                    list.add(dto);
                }
                break;
        }

        return list;
    }

    public boolean createUserAchieve(User user){
        List<Achieve> achieveList = achieveRepository.findAll();
        for(Achieve achieve : achieveList){
            UserAchieve userAchieve = UserAchieve.builder()
                    .achieve(achieve)
                    .user(user)
                    .build();

            userAchieveRepository.save(userAchieve);
        }
        return true;
    }
}
