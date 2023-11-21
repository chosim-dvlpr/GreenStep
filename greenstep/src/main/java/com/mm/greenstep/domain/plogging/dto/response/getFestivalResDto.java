package com.mm.greenstep.domain.plogging.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class getFestivalResDto {
    private String festivalName;
    private String festivalUrl;
}
