package com.mm.greenstep.domain.plogging.service;

import com.mm.greenstep.domain.plogging.dto.response.PloggingAllLogResDto;
import com.mm.greenstep.domain.plogging.entity.Plogging;
import com.mm.greenstep.domain.plogging.repository.PloggingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final PloggingRepository ploggingRepository;

    public PloggingAllLogResDto getAllPloggingLog() {
        List<Plogging> ploggingList = ploggingRepository.findAll();

        Double travelRange = 0.0;
        Double travelTime  = 0.0;
        Integer trashAmount  = 0;

        for (Plogging p : ploggingList) {
            travelRange += p.getTravelRange();
            travelTime += p.getTravelTime();
            trashAmount += p.getTrashAmount();
        }

        PloggingAllLogResDto dto = PloggingAllLogResDto.builder()
                .trashAmount(trashAmount)
                .travelRange(travelRange)
                .travelTime(travelTime)
                .build();

        return dto;
    }

    public List<String> getAllPloggingImg() {
        // 원하는 개수만큼 랜덤한 레코드를 가져올 페이지 크기를 설정합니다.
        int count = 6;

        // findAll() 메서드 대신에 custom query를 사용하여 랜덤한 6개의 레코드를 가져옵니다.
        List<Plogging> ploggingList = ploggingRepository.findRandomVisiblePloggingRecords(count);
        for (Plogging p : ploggingList) {
            System.out.println(p.getTravelPicture());
        }

        // 플로깅이 없으면 null
        if (ploggingList.isEmpty()) {
            return Collections.emptyList();
        }


        List<String> imgList = new ArrayList<>();


        for (Plogging p : ploggingList) {
            String Img = p.getTravelPicture();
            imgList.add(Img);
        }

        return imgList;
    }
}
