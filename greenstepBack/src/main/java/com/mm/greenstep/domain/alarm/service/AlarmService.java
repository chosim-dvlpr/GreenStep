package com.mm.greenstep.domain.alarm.service;

import com.mm.greenstep.domain.alarm.dto.response.AlarmResDto;
import com.mm.greenstep.domain.alarm.entity.Alarm;
import com.mm.greenstep.domain.alarm.repository.AlarmRepository;
import com.mm.greenstep.domain.avatar.entity.Avatar;
import com.mm.greenstep.domain.avatar.entity.UserAvatar;
import com.mm.greenstep.domain.avatar.repository.AvatarRepository;
import com.mm.greenstep.domain.avatar.repository.UserAvatarRepository;
import com.mm.greenstep.domain.common.util.SecurityUtil;
import com.mm.greenstep.domain.compete.entity.Victory;
import com.mm.greenstep.domain.compete.repository.VictoryRepository;
import com.mm.greenstep.domain.plogging.dto.response.getAvatar;
import com.mm.greenstep.domain.user.entity.Team;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final UserRepository userRepository;
    private final VictoryRepository victoryRepository;
    private final AlarmRepository alarmRepository;
    private final AvatarRepository avatarRepository;
    private final UserAvatarRepository userAvatarRepository;

    /**
     * 경쟁 종료시 모든 유저에게 보내는 알람 생성
     */
    public void createVictoryCompleteAlarm(){
        // 1달 전 LocalDate가져옴
        LocalDate lastMonth = LocalDate.now().minusMonths(1);
        Victory lastMonthVictory =  victoryRepository.findByYearAndMonth(lastMonth.getYear(), lastMonth.getMonthValue()).orElseThrow();
        Team victoryTeam = lastMonthVictory.getTeam();

        // 알림 문자 생성
        String title = "경쟁이 종료되었습니다!";
        String content = lastMonth + "의 우승팀은 "+lastMonthVictory.getTeam()+"입니다!";

        // 모든 사용자의 알림 생성
        List<User> userList = userRepository.findAll();
        for(User user : userList){
            Alarm alarm = Alarm.builder()
                    .victory(lastMonthVictory)
                    .user(user)
                    .title(title)
                    .content(content)
                    .isReward(user.getTeam() == victoryTeam)
                    .build();

            alarmRepository.save(alarm);
        }

    }


    /**
     * 유저의 모든 알람 조회
     * @return
     */
    public ResponseEntity<?> getVictoryAlarm(){
        User user = SecurityUtil.getCurrentUser();

        List<Alarm> alarmList = alarmRepository.findAllByUserAndIsConfirmFalse(user);
        List<AlarmResDto> result = new ArrayList<>();

        if (!alarmList.isEmpty()){
            for(Alarm alarm : alarmList){
                AlarmResDto alarmResDto = AlarmResDto.builder()
                        .alarmId(alarm.getAlarmId())
                        .title(alarm.getTitle())
                        .content(alarm.getContent())
                        .createAt(alarm.getCreatedAt())
                        .isReward(alarm.getIsReward())
                        .build();

                result.add(alarmResDto);
            }
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    public ResponseEntity<?> updateIsConfirmAlarm(Long alarmId){
        User user = SecurityUtil.getCurrentUser();
        Alarm alarm = alarmRepository.findById(alarmId).orElseThrow();

        getAvatar g = null;

        // 랜덤박스 보상인 경우
        if (alarm.getIsReward()){
            Avatar randomAvatar = avatarRepository.findRandomAvatarWithTypeOne();

            // 뽑은 아바타 넘겨주기
            g = getAvatar.builder()
                    .avatarImg(randomAvatar.getAvatarImg())
                    .avatarName(randomAvatar.getAvatarName())
                    .build();

            // randomAvatar가 해당 user의 userAvatar에 없을 때
            UserAvatar checkUserAvatar = userAvatarRepository.findByUserAndAvatar(user, randomAvatar);
            if(checkUserAvatar == null) {
                // 선택된 랜덤 아바타를 `user_avatar` 테이블에 추가
                UserAvatar userAvatar = UserAvatar.builder()
                        .user(user)
                        .avatar(randomAvatar)
                        .isSelected(false)
                        .build();

                userAvatarRepository.save(userAvatar);
            }
        }

        alarm.updateConfirmAlarm();
        alarmRepository.save(alarm);

        return new ResponseEntity<>(g, HttpStatus.OK);
    }

}
