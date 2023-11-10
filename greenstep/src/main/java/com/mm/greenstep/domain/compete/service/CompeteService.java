package com.mm.greenstep.domain.compete.service;

import com.mm.greenstep.domain.common.util.SecurityUtil;
import com.mm.greenstep.domain.compete.dto.response.CompeteResDto;
import com.mm.greenstep.domain.compete.entity.Compete;
import com.mm.greenstep.domain.compete.entity.Victory;
import com.mm.greenstep.domain.compete.repository.CompeteRepository;
import com.mm.greenstep.domain.compete.repository.VictoryRepository;
import com.mm.greenstep.domain.user.entity.Team;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompeteService {

    private final CompeteRepository competeRepository;
    private final VictoryRepository victoryRepository;


    public CompeteResDto getCurrentCompete() {
        // 현재의 경쟁 기록 가져오기
        LocalDate current = LocalDate.now();
        Victory currentVictory = victoryRepository.findByYearAndMonth(current.getYear(),current.getMonthValue()).orElseThrow();

        return getCompeteResDto(currentVictory);
    }

    public CompeteResDto getCompete(YearMonth insert){
        // 해당 년도 경쟁 기록 가져오기
        Victory insertVictory = victoryRepository.findByYearAndMonth(insert.getYear(),insert.getMonthValue()).orElseThrow();

        return getCompeteResDto(insertVictory);
    }

    public CompeteResDto getCompeteResDto(Victory victory){
        List<Compete> competeList = competeRepository.findAllByVictory(victory);

        Compete compete1Team = competeList.get(0);
        Compete compete2Team = competeList.get(1);

        Team myTeam = SecurityUtil.getCurrentUser().getTeam();

        Compete myTeamCompete, otherTeamCompete;

        if (compete1Team.getTeam() == myTeam) {
            myTeamCompete = compete1Team;
            otherTeamCompete = compete2Team;
        } else {
            myTeamCompete = compete2Team;
            otherTeamCompete = compete1Team;
        }

        return CompeteResDto.builder()
                .goalScore(victory.getGoalScore())
                .myTeamScore(myTeamCompete.getCompeteScore())
                .myTeamName(myTeam.getTeamName())
                .otherTeamScore(otherTeamCompete.getCompeteScore())
                .otherTeamName(otherTeamCompete.getTeam().getTeamName())
                .myTeamCompeteTime(myTeamCompete.getCompeteTime())
                .myTeamCompeteRange(myTeamCompete.getCompeteRange())
                .myTeamCompeteAmount(myTeamCompete.getCompeteAmount())
                .isCompleted(victory.getIsComplete())
                .victoryTeam(victory.getTeam())
                .build();
    }


    /**
     * 플로깅 후 경쟁에 데이터 추가
     * @param AITrashAmount
     * @param TravelRange
     * @param TravelTime
     * @param TrashAmount
     */
    public void updateCompete(Victory currentVictory, int AITrashAmount, double TravelRange, long TravelTime, int TrashAmount){
        // 내팀 조회
        Team team = SecurityUtil.getCurrentUser().getTeam();

        Compete currentCompete = competeRepository.findByVictoryAndTeam(currentVictory,team);

        // Score갱신
        Integer score = (int) ((AITrashAmount * 2)
                + (TravelRange * 5)
                + (TravelTime * 5)
                // 쓰레기로 주울 수 있는 최대값 제한
                + (Math.min((TrashAmount * 0.5) , 20)));

        // 한번의 플로깅으로 얻을 수 있는 score 최대 200점 제한
        Integer updateScore = Math.min(score, 200);

        currentCompete.updateCompete(TravelRange,TravelTime,TrashAmount,updateScore);

        // 플로깅 후 목표점수 도달 여부 확인
        if (currentCompete.getCompeteScore() >= currentVictory.getGoalScore()){
            currentCompete.updateScore(currentVictory.getGoalScore());
            currentVictory.updateVictoryTeam(team);
        }

        competeRepository.save(currentCompete);
    }

}
