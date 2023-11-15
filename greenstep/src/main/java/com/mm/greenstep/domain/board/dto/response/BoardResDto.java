package com.mm.greenstep.domain.board.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class BoardResDto {
    private Long boardId;
    private String nickname;
    private String AvatarImage;
    private String boardTitle;
    private String boardContent;
    private String scheduleTime;
    private String scheduleLocation;
    private Long maxParticipants;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDeleted;
    private Boolean isAttended;

}