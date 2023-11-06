package com.mm.greenstep.domain.compete.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class CompeteController {

    @GetMapping("/")
    public ResponseEntity<?> getDetailCompete(@PathVariable YearMonth yearMonth){

        return return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

}
