package com.mm.greenstep.domain.compete.api;

import com.mm.greenstep.domain.compete.dto.response.CompeteResDto;
import com.mm.greenstep.domain.compete.service.CompeteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;

@RestController
@RequestMapping("/compete")
@RequiredArgsConstructor
public class CompeteController {

    private final CompeteService competeService;

    // 양팀 진척도 조회
    @GetMapping("/")
    public ResponseEntity<?> getCompete(){
        CompeteResDto responseDto = competeService.getCurrentCompete();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/history/{year}/{month}")
    public ResponseEntity<?> getCompete(@PathVariable int year, @PathVariable int month){
        YearMonth yearMonth = YearMonth.of(year,month);
        CompeteResDto responseDto = competeService.getCompete(yearMonth);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

}
