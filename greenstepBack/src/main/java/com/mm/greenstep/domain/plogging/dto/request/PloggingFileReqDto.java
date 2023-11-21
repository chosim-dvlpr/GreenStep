package com.mm.greenstep.domain.plogging.dto.request;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Getter
public class PloggingFileReqDto {
    MultipartFile multipartFile;
    Integer projectId;
}
