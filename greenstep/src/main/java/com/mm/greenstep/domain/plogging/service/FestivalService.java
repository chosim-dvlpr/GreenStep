package com.mm.greenstep.domain.plogging.service;

import com.mm.greenstep.domain.plogging.dto.response.getFestivalResDto;
import com.mm.greenstep.domain.plogging.entity.Festival;
import com.mm.greenstep.domain.plogging.repository.FestivalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FestivalService {
    private final FestivalRepository festivalRepository;

    // 크롤링 정보 추가갱신 스케쥴러 3일 마다 호출


    public List<getFestivalResDto> getFestivalInfo() {
        List<Festival> festivalList = festivalRepository.findAll();
        List<getFestivalResDto> festivalDtoList = new ArrayList<>();

        for (Festival f : festivalList) {
            getFestivalResDto dto = getFestivalResDto.builder()
                    .festivalName(f.getFestivalName())
                    .festivalUrl(f.getFestivalUrl())
                    .build();

            festivalDtoList.add(dto);
        }

        return festivalDtoList;
    }
}
