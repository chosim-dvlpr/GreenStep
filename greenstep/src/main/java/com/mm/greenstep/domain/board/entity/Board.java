package com.mm.greenstep.domain.board.entity;

import com.mm.greenstep.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "board")
public class Board {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name= "board_title")
    private String boardTitle;

    @Column(name= "board_content")
    private String boardContent;

    @Column(name= "schedule_time")
    private LocalDate scheduleTime;

    @Column(name= "schedule_location")
    private String scheduleLocation;

    @Column(name = "is_deleted" , columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDeleted;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at" )
    private LocalDateTime deletedAt;

    @Column(name = "max_participants")
    private  Long maxParticipants;

    // 삭제처리
    public void deleteState() {
        this.isDeleted = true;
    }

    @PrePersist
    public void prepersist(){
        this.isDeleted = false;
    }
}