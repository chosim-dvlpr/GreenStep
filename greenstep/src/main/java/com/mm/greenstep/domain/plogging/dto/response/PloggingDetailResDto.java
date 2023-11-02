package com.mm.greenstep.domain.plogging.dto.response;

import com.mm.greenstep.domain.plogging.dto.request.PloggingCoorDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;


@Builder
@Getter
public class PloggingDetailResDto {
    private Integer getExp;
    private Double travelTime;
    private Double travelRange;
    private Integer trashAmount;
    private LocalDateTime createdAt;
    private String travelPicture;
    private List<PloggingCoorDto> coorList;
}
