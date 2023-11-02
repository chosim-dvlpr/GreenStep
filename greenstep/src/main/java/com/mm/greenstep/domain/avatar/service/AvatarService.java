package com.mm.greenstep.domain.avatar.service;

import com.mm.greenstep.domain.avatar.dto.response.AvatarAllResDto;
import com.mm.greenstep.domain.avatar.entity.Avatar;
import com.mm.greenstep.domain.avatar.entity.UserAvatar;
import com.mm.greenstep.domain.avatar.repository.AvatarRepository;
import com.mm.greenstep.domain.avatar.repository.UserAvatarRepository;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvatarService {

    private final UserRepository userRepository;
    private final UserAvatarRepository userAvatarRepository;
    private final AvatarRepository avatarRepository;


    public void updateAvatar(HttpServletRequest request, Long boxId) {
        Long user_pk = 100L;

        User user = userRepository.findByUserId(user_pk);
        UserAvatar userAvatar = userAvatarRepository.findByUser(user);
        Avatar avatar = avatarRepository.findByBoxId(boxId);
        userAvatar.updateAvatar(avatar);
        userAvatarRepository.save(userAvatar);
    }

    public List<AvatarAllResDto> getAllMyAvatar(HttpServletRequest request) {
        Long user_pk = 100L;

        User user = userRepository.findByUserId(user_pk);
        List<UserAvatar> userAvatarList = userAvatarRepository.findAllByUser(user);
        List<AvatarAllResDto> list = new ArrayList<>();

        for (UserAvatar userAvatar : userAvatarList) {
            AvatarAllResDto dto = AvatarAllResDto.builder()
                    .boxId(userAvatar.getAvatar().getBoxId())
                    .avatarImg(userAvatar.getAvatar().getAvatarImg())
                    .avatarName(userAvatar.getAvatar().getAvatarName())
                    .build();
            list.add(dto);
        }
        return list;
    }
}
