package com.mm.greenstep.domain.compete.service;

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

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SchedulerService {

    private final VictoryRepository victoryRepository;
    private final CompeteRepository competeRepository;
    private final TeamRepository teamRepository;

    // 요일 상관 없이, 매월, 1일, 00시, 1분, 0초 실행
    // cron = 초 분 시간 일 월 요일(0:일, 1:월, --- , 6:토), 연도 설정 안됨
    @Scheduled(cron= "0 1 0 1 * *",zone = "Asia/Seoul")
    public void run(){
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
    }

    // 요일 상관 없이, 매월, 1일, 00시, 1분, 0초 실행
    // cron = 초 분 시간 일 월 요일(0:일, 1:월, --- , 6:토), 연도 설정 안됨
//    @Scheduled(cron= "0 * 16 7 11 *",zone = "Asia/Seoul")
//    public void test(){
//        log.info("create victory");
//        Victory victory = new Victory();
//        victoryRepository.save(victory);
//
//        log.info("victoryId : "+String.valueOf(victory.getVictoryId()));
//
//        Team team1 = teamRepository.findById(1).orElseThrow();
//        Team team2 = teamRepository.findById(2).orElseThrow();
//
//        log.info("start create compete");
//        Compete team1Compete = Compete.builder()
//                .team(team1)
//                .victory(victory)
//                .build();
//        Compete team2Compete = Compete.builder()
//                .team(team2)
//                .victory(victory)
//                .build();
//        competeRepository.save(team1Compete);
//        competeRepository.save(team2Compete);
//        log.info("created Compete1 : "+ team1Compete.getCompeteId());
//        log.info("created Compete2 : "+ team2Compete.getCompeteId());
//    }

}
