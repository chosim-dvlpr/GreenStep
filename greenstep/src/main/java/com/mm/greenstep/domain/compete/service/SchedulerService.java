package com.mm.greenstep.domain.compete.service;

import com.mm.greenstep.domain.alarm.service.AlarmService;
import com.mm.greenstep.domain.compete.entity.Compete;
import com.mm.greenstep.domain.compete.entity.Victory;
import com.mm.greenstep.domain.compete.repository.CompeteRepository;
import com.mm.greenstep.domain.compete.repository.VictoryRepository;
import com.mm.greenstep.domain.user.entity.Team;
import com.mm.greenstep.domain.user.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SchedulerService {

    private final VictoryRepository victoryRepository;
    private final CompeteRepository competeRepository;
    private final TeamRepository teamRepository;

    private final AlarmService alarmService;

    // 요일 상관 없이, 매월, 1일, 00시, 1분, 0초 실행
    // cron = 초 분 시간 일 월 요일(0:일, 1:월, --- , 6:토), 연도 설정 안됨
    @Scheduled(cron= "1 0 0 1 * *",zone = "Asia/Seoul")
    public void createVictory(){
        log.info("create victory");
        Victory victory = new Victory();
        victoryRepository.save(victory);
        log.info("victoryId : "+String.valueOf(victory.getVictoryId()));

        Team team1 = teamRepository.findById(1).orElseThrow();
        Team team2 = teamRepository.findById(2).orElseThrow();

        log.info("start create compete");
        Compete team1Compete = Compete.builder()
                .team(team1)
                .victory(victory)
                .build();
        Compete team2Compete = Compete.builder()
                .team(team2)
                .victory(victory)
                .build();
        competeRepository.save(team1Compete);
        competeRepository.save(team2Compete);
        log.info("created Compete1 : "+ team1Compete.getCompeteId());
        log.info("created Compete2 : "+ team2Compete.getCompeteId());

        // 경쟁 종료
        completeVictory();

        // 경쟁 종료 알림 생성
        alarmService.createVictoryCompleteAlarm();
    }

    public void completeVictory(){
        // 1달 전 LocalDate가져옴
        LocalDate lastMonth = LocalDate.now().minusMonths(1);
        Victory lastMonthVictory =  victoryRepository.findByYearAndMonth(lastMonth.getYear(), lastMonth.getMonthValue()).orElseThrow();

        // 경쟁이 끝나지 않은 경우
        if(!lastMonthVictory.getIsComplete()){
            List<Compete> competeList = competeRepository.findAllByVictory(lastMonthVictory);

            Compete compete1Team = competeList.get(0);
            Compete compete2Team = competeList.get(1);

            if (compete1Team.getCompeteScore() > compete2Team.getCompeteScore()){
                lastMonthVictory.updateVictoryTeam(compete1Team.getTeam());
                log.info("lastMonthVictory - victoryTeam : " + compete1Team.getTeam().getTeamId() );
            } else if(compete1Team.getCompeteScore() < compete2Team.getCompeteScore()){
                lastMonthVictory.updateVictoryTeam(compete2Team.getTeam());
                log.info("lastMonthVictory - victoryTeam : " + compete2Team.getTeam().getTeamId());
            } else{
                lastMonthVictory.updateVictoryComplete();
                log.info("lastMonthVictory - tie");
            }

            victoryRepository.save(lastMonthVictory);
        }
    }

}
