package com.mm.greenstep.domain.plogging.entity;

import com.mm.greenstep.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "plogging")
public class Plogging {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plogging_id")
    private Long ploggingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "travel_range")
    private Double travelRange;

    @Column(name = "travel_time", nullable = false)
    private Double travelTime;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

//    @Column(name = "start_latitude", nullable = false)
//    private String startLatitude;
//
//    @Column(name = "start_longitude", nullable = false)
//    private String startLongitude;
//
//    @Column(name = "end_latitude")
//    private String endLatitude;
//
//    @Column(name = "end_longitude")
//    private String endLongitude;

    @Column(name = "get_exp")
    private Integer getExp;

    @Column(name = "travel_picture")
    private String travelPicture;

    @Column(name = "is_visibled")
    private Boolean isVisibled;

    public void updatePloggingImg(String s3Url) {
        this.travelPicture = s3Url;
    }
}