package com.mm.greenstep.domain.avatar.service;

import com.mm.greenstep.domain.avatar.dto.response.AvatarAllResDto;
import com.mm.greenstep.domain.avatar.entity.UserAvatar;
import com.mm.greenstep.domain.avatar.repository.UserAvatarRepository;
import com.mm.greenstep.domain.common.util.SecurityUtil;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvatarService {
    private final UserRepository userRepository;
    private final UserAvatarRepository userAvatarRepository;

    public String updateAvatar(Long avatarId) {
        Long user_pk = SecurityUtil.getCurrentUserId();

        User user = userRepository.findByUserId(user_pk);
        if (user == null) {
            return "User not found";
        }
        UserAvatar userAvatar = userAvatarRepository.findByUserAndAvatarId(user, avatarId);
        if (userAvatar == null) {
            return "User Avatar not found";
        }

        UserAvatar selectedUserAvatar = userAvatarRepository.findByUserAndIsSelected(user, true);

        if(selectedUserAvatar != null) {
            selectedUserAvatar.updateAvatar(false);
            userAvatarRepository.save(selectedUserAvatar);
        }

        userAvatar.updateAvatar(true);
        userAvatarRepository.save(userAvatar);

        return "success";
    }

    public List<AvatarAllResDto> getAllMyAvatar() {
        Long user_pk = SecurityUtil.getCurrentUserId();

        User user = userRepository.findByUserId(user_pk);
        List<UserAvatar> userAvatarList = userAvatarRepository.findAllByUser(user);
        List<AvatarAllResDto> list = new ArrayList<>();

        for (UserAvatar userAvatar : userAvatarList) {
            AvatarAllResDto dto = AvatarAllResDto.builder()
                    .boxId(userAvatar.getAvatar().getBoxId())
                    .avatarId(userAvatar.getAvatarId())
                    .avatarImg(userAvatar.getAvatar().getAvatarImg())
                    .avatarName(userAvatar.getAvatar().getAvatarName())
                    .isSelected(userAvatar.getIsSelected())
                    .build();
            list.add(dto);
        }
        return list;
    }
}
