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

import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompeteService {

    private final CompeteRepository competeRepository;
    private final VictoryRepository victoryRepository;


    public CompeteResDto getCurrentCompete() {
        // 현재의 경쟁 기록 가져오기
        YearMonth current = YearMonth.now();
        Victory currentVictory = victoryRepository.findByVictoryMonth(current).orElseThrow();

        List<Compete> competeList = competeRepository.findAllByVictory(currentVictory);

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
                .goalScore(currentVictory.getGoalScore())
                .myTeamScore(myTeamCompete.getCompeteScore())
                .otherTeamScore(otherTeamCompete.getCompeteScore())
                .myTeamCompeteTime(myTeamCompete.getCompeteTime())
                .myTeamCompeteRange(myTeamCompete.getCompeteRange())
                .myTeamCompeteAmount(myTeamCompete.getCompeteAmount())
                .build();
    }



    public CompeteResDto getCompete(YearMonth insert){
        // 해당 년도 경쟁 기록 가져오기
        YearMonth current = YearMonth.now();
        Victory currentVictory = victoryRepository.findByVictoryMonth(insert).orElseThrow();

        List<Compete> competeList = competeRepository.findAllByVictory(currentVictory);

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
                .goalScore(currentVictory.getGoalScore())
                .myTeamScore(myTeamCompete.getCompeteScore())
                .otherTeamScore(otherTeamCompete.getCompeteScore())
                .myTeamCompeteTime(myTeamCompete.getCompeteTime())
                .myTeamCompeteRange(myTeamCompete.getCompeteRange())
                .myTeamCompeteAmount(myTeamCompete.getCompeteAmount())
                .build();
    }

}
