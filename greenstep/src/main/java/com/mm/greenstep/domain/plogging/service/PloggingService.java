package com.mm.greenstep.domain.plogging.service;

import com.mm.greenstep.domain.achieve.entity.UserAchieve;
import com.mm.greenstep.domain.achieve.repository.UserAchieveRepository;
import com.mm.greenstep.domain.avatar.entity.Avatar;
import com.mm.greenstep.domain.avatar.entity.UserAvatar;
import com.mm.greenstep.domain.avatar.repository.AvatarRepository;
import com.mm.greenstep.domain.avatar.repository.UserAvatarRepository;
import com.mm.greenstep.domain.common.util.SecurityUtil;
import com.mm.greenstep.domain.compete.entity.Victory;
import com.mm.greenstep.domain.compete.repository.VictoryRepository;
import com.mm.greenstep.domain.compete.service.CompeteService;
import com.mm.greenstep.domain.plogging.dto.request.PloggingCoorDto;
import com.mm.greenstep.domain.plogging.dto.request.PloggingReqDto;
import com.mm.greenstep.domain.plogging.dto.request.PloggingTrashReqDto;
import com.mm.greenstep.domain.plogging.dto.request.PloggingUpdateImgReqDto;
import com.mm.greenstep.domain.plogging.dto.response.*;
import com.mm.greenstep.domain.plogging.entity.Coordinate;
import com.mm.greenstep.domain.plogging.entity.Plogging;
import com.mm.greenstep.domain.plogging.entity.Trash;
import com.mm.greenstep.domain.plogging.entity.TrashBox;
import com.mm.greenstep.domain.plogging.repository.PloggingRepository;
import com.mm.greenstep.domain.plogging.repository.CoordinateRepository;
import com.mm.greenstep.domain.plogging.repository.TrashBoxRepository;
import com.mm.greenstep.domain.plogging.repository.TrashRepository;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PloggingService {

    private final UserRepository userRepository;
    private final PloggingRepository ploggingRepository;
    private final AvatarRepository avatarRepository;
    private final UserAvatarRepository userAvatarRepository;
    private final AmazonS3Service amazonS3Service;
    private final CoordinateRepository coordinateRepository;
    private final TrashRepository trashRepository;
    private final UserAchieveRepository userAchieveRepository; // 내 업적 레포
    private final TrashBoxRepository trashBoxRepository;
    private final CompeteService competeService;
    private final VictoryRepository victoryRepository;

    public PloggingResDto createPlogging(PloggingReqDto dto) {
        Boolean levelUp = false;

        Long user_pk = SecurityUtil.getCurrentUserId();
        User user = userRepository.findByUserId(user_pk);

        // 대한민국 시간대로 현재 시간을 설정
        LocalDateTime endTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        // dto.getTravelTime()이 초 단위로 시간을 반환한다고 가정
        Long travelTimeInSeconds = dto.getTravelTime();
        LocalDateTime startTime = endTime.minusSeconds(travelTimeInSeconds);


        // 현재 시간 얻어오기
        LocalDate current = LocalDate.now();
        // 현재 진행중인 경쟁 확인
        Victory currentVictory = victoryRepository.findByYearAndMonth(current.getYear(),current.getMonthValue()).orElseThrow();
        if (!currentVictory.getIsComplete()){
            // 경쟁 score 갱신
            competeService.updateCompete(currentVictory, dto.getAITrashAmount(),dto.getTravelRange(),dto.getTravelTime(), dto.getTrashAmount());
        }

        // 경험치 계산
        Integer getExp =
                (int) ((dto.getAITrashAmount() * 0.9) +
                        (dto.getTravelRange() * 0.7) +
                        (dto.getTravelTime() * 0.05) +
                        (dto.getTrashAmount() * 0.5)) ;

        Plogging plogging = Plogging.builder()
                .createdAt(startTime)
                .updatedAt(endTime)
                .user(user)
                .trashAmount(dto.getTrashAmount())
                .travelTime(dto.getTravelTime())
                .travelRange(dto.getTravelRange())
                .getExp(getExp)
                .build();

        // 경험치 계산
        Integer exp = user.getExp() + getExp;

        List<getAvatar> getAvatarList = new ArrayList<>();

        // 레벨업 계산
        if (exp >= 100) {
            int up = exp/100;
            int remainingExp = exp%100;
            user.levelUp(up, remainingExp);
            levelUp = true;

            for (int i = 0; i < up; i++) {
                // 랜덤 아바타 선택을 위한 쿼리
                Avatar randomAvatar = avatarRepository.findRandomAvatar();

                // 뽑은 아바타 넘겨주기
                getAvatar g = getAvatar.builder()
                        .avatarImg(randomAvatar.getAvatarImg())
                        .avatarName(randomAvatar.getAvatarName())
                        .build();

                getAvatarList.add(g);

                // randomAvatar가 해당 user의 userAvatar에 있으면 continue;
                UserAvatar checkUserAvatar = userAvatarRepository.findByUserAndAvatar(user, randomAvatar);
                if(checkUserAvatar != null) continue;

                // 선택된 랜덤 아바타를 `user_avatar` 테이블에 추가
                UserAvatar userAvatar = UserAvatar.builder()
                        .user(user)
                        .avatar(randomAvatar)
                        .isSelected(false)
                        .build();

                userAvatarRepository.save(userAvatar);
            }

        }

        userRepository.save(user);
        ploggingRepository.save(plogging);

        PloggingResDto responseDto = PloggingResDto.builder()
                .trashAmount(getExp)
                .travelRange(dto.getTravelRange())
                .trashAmount(dto.getTrashAmount())
                .travelTime(dto.getTravelTime())
                .isLevelUp(levelUp)
                .getAvatarList(getAvatarList)
                .ploggingId(plogging.getPloggingId())
                .getExp(getExp)
                .build();

        // 플로깅 모든 위도 경도 등록
        for (PloggingCoorDto c : dto.getCoorList()) {
            Coordinate p = Coordinate.builder()
                    .latitude(c.getLatitude())
                    .longitude(c.getLongitude())
                    .plogging(plogging)
                    .build();
            coordinateRepository.save(p);
        }

        // 플로깅 모든 쓰레기 좌표 등록
        for (PloggingTrashReqDto tr : dto.getTrashList()) {
            Trash t = Trash.builder()
                    .plogging(plogging)
                    .latitude(tr.getLatitude())
                    .longitude(tr.getLongitude())
                    .trashType(tr.getTrashType())
                    .build();
            trashRepository.save(t);
        }

        // 업적 갱신
        // 업적들을 돌면서 나의 플로깅 이력을 다가져오기
        List<Plogging> ploggingList = ploggingRepository.findAllByUser(user);
        Integer myTrashAmount = 0; // 나의 총 쓰레기 량
        Double myTravelRange = 0.0; // 나의 총 이동거리
        Double myTravelTime = 0.0; // 나의 총 이동시간
        Integer myPloggingCount = ploggingList.size();

        for (Plogging p : ploggingList) {
            myTrashAmount += p.getTrashAmount();
            myTravelRange += p.getTravelRange();
            myTravelTime += p.getTravelTime();
        }

        // 깨지지 않은 나의 모든 업적 가져온다.
        List<UserAchieve> achieveList = userAchieveRepository.findAllByUserAndIsBreakedFalse(user);

        for (UserAchieve ua : achieveList) {
            Byte achieveType = ua.getAchieve().getAchieveType();

            switch (achieveType) {
            // 거리
            case 1:
                if(ua.getAchieve().getAchieveDistance() <= myTravelRange) {
                    ua.updateisBreaked();
                    userAchieveRepository.save(ua);
                }
                break;
            // 시간
            case 2:
                if(ua.getAchieve().getAchieveTime() <= myTravelTime) {
                    ua.updateisBreaked();
                    userAchieveRepository.save(ua);
                }
                break;
            // 쓰레기 수
            case 3:
                if(ua.getAchieve().getAchieveTrash() <= myTrashAmount) {
                    ua.updateisBreaked();
                    userAchieveRepository.save(ua);
                }
                break;
            // 횟수
            case 4:
                if(ua.getAchieve().getAchieveCount() <= myPloggingCount) {
                    ua.updateisBreaked();
                    userAchieveRepository.save(ua);
                }
                break;
            }
        }
        return responseDto;
    }

    public void updatePloggingImg(MultipartFile file, Long ploggingId) {
        Plogging plogging = ploggingRepository.findByPloggingId(ploggingId);

        String s3Url = amazonS3Service.uploadFile(file);

        plogging.updatePloggingImg(s3Url);
        ploggingRepository.save(plogging);
    }

    public List<PloggingAllResDto> getAllPlogging(HttpServletRequest request) {
        List<PloggingAllResDto> dtoList = new ArrayList<>();
        Long user_pk = SecurityUtil.getCurrentUserId();
        User user = userRepository.findByUserId(user_pk);
        List<Plogging> plogging = ploggingRepository.findAllByUser(user);

        for (Plogging p : plogging) {
            PloggingAllResDto dto = PloggingAllResDto.builder()
                    .ploggingId(p.getPloggingId())
                    .createdAt(p.getCreatedAt())
                    .getExp(p.getGetExp())
                    .travelRange(p.getTravelRange())
                    .trashAmount(p.getTrashAmount())
                    .travelTime(p.getTravelTime())
                    .travelPicture(p.getTravelPicture())
                    .build();
            dtoList.add(dto);
        }


        return dtoList;
    }

    public PloggingDetailResDto getDetailPlogging(Long ploggingId) {
        Plogging plogging = ploggingRepository.findByPloggingId(ploggingId);

        if (plogging == null) {
            throw new EntityNotFoundException("Plogging with id " + ploggingId + " not found.");
        }

        List<Coordinate> position = coordinateRepository.findAllByPlogging(plogging);

        List<PloggingCoorDto> ploggingCoorDtoList = new ArrayList<>();

        for (Coordinate p : position) {
            PloggingCoorDto dto = PloggingCoorDto.builder()
                    .latitude(p.getLatitude())
                    .longitude(p.getLongitude())
                    .build();
            ploggingCoorDtoList.add(dto);
        }

        PloggingDetailResDto dto = PloggingDetailResDto.builder()
                .createdAt(plogging.getCreatedAt())
                .getExp(plogging.getGetExp())
                .travelRange(plogging.getTravelRange())
                .trashAmount(plogging.getTrashAmount())
                .travelTime(plogging.getTravelTime())
                .coorList(ploggingCoorDtoList)
                .travelPicture(plogging.getTravelPicture())
                .build();

        return dto;
    }

    public String createAiImg(MultipartFile file) {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://k9b303.p.ssafy.io/py") // FastAPI 서버 URL
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
                .build();

        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();

        try {
            formData.add("file", new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            });
        } catch (IOException e) {
            // IOException 처리
            e.printStackTrace();
            // 에러 처리 로직 구현, 예를 들면 에러 메시지를 반환할 수 있습니다.
            return "File processing error: " + e.getMessage();
        }

        // POST 요청을 보내고 응답을 String으로 받음
        String response = webClient.post()
                .uri("/predict-image")
                .bodyValue(formData)
                .retrieve() // 서버로부터의 응답을 가져옴
                .bodyToMono(String.class) // 응답을 String 형태로 변환
                .block(); // 비동기 실행을 동기화하고 결과를 가져옴

        return response;
    }


    public List<TrashBoxAllResDto> getAllTrashBox() {
        List<TrashBoxAllResDto> dtoList = new ArrayList<>();
        List<TrashBox> trashBoxList = trashBoxRepository.findAll();

        for (TrashBox t : trashBoxList) {
            TrashBoxAllResDto dto = TrashBoxAllResDto.builder()
                    .latitude(t.getLatitude())
                    .longitude(t.getLongitude())
                    .type(t.getType())
                    .build();

            dtoList.add(dto);
        }

        return dtoList;
    }

    public List<TrashDataAllResDto> getAllTrashData() {
        List<TrashDataAllResDto> dtoList = new ArrayList<>();
        List<Trash> trashList = trashRepository.findAll();

        for (Trash t : trashList) {
            TrashDataAllResDto dto = TrashDataAllResDto.builder()
                    .latitude(t.getLatitude())
                    .longitude(t.getLongitude())
                    .trashType(t.getTrashType())
                    .build();

            dtoList.add(dto);
        }

        return dtoList;
    }


    public void updateVisible(Boolean isVisible, Long ploggingId) {
        Plogging plogging = ploggingRepository.findByPloggingId(ploggingId);

        plogging.updateVisible(isVisible);
        ploggingRepository.save(plogging);
    }
}
