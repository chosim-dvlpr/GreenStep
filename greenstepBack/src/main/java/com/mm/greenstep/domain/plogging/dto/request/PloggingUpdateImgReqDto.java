package com.mm.greenstep.domain.plogging.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PloggingUpdateImgReqDto {
    private Long ploggingId;
    private Boolean isVisible;
}