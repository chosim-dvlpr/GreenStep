package com.mm.greenstep.domain.alarm.controller;


import com.mm.greenstep.domain.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alarm")
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    /**
     * 나의 모든 알람 조회
     * @return
     */
    @GetMapping("/victory")
    public ResponseEntity<?> getVictoryAlarm(){
        return alarmService.getVictoryAlarm();
    }

    @GetMapping("/confirm/{alarmId}")
    public ResponseEntity<?> updateIsConfirmAlarm(@PathVariable Long alarmId){
        return alarmService.updateIsConfirmAlarm(alarmId);
    }

}
