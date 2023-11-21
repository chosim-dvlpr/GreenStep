package com.mm.greenstep.domain.board.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class BoardReqDto {
//    private User user;
    private String boardTitle;
    private String boardContent;
    private String scheduleLocation;
    private LocalDate scheduleTime;
    private Long maxParticipants;
}
