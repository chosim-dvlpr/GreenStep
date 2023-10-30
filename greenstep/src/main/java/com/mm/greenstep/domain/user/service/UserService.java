//package com.mm.greenstep.domain.user.service;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.ArrayList;
//
//
//@Service
//@RequiredArgsConstructor
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//    private final JwtAuthenticationProvider jwtAuthenticationProvider;
//    private final JwtUtil jwtUtil;
//
//    @Transactional
//    public UserSignUpResponseDto signup(UserSignUpRequestDto userSignUpRequestDto) {
//        // 폰 번호 & 이름 중복 검증 => 이미 가입한 이용자입니다.
//        if (userRepository.existsByUserCellNo(userSignUpRequestDto.getUserCellNo()) ||
//                userRepository.existsByUserCellNoAndUserName(userSignUpRequestDto.getUserCellNo(), userSignUpRequestDto.getUserName())) {
//            throw new RuntimeException("이미");
//        }
//
//        String encryptPassword = bCryptPasswordEncoder.encode(userSignUpRequestDto.getUserSimplePass());
//
//        userRepository.save(User.builder()
//                        .userCellNo(userSignUpRequestDto.getUserCellNo())
//                        .userName(userSignUpRequestDto.getUserName())
//                        .userSimplePass(encryptPassword)
//                        .userFirebaseToken(userSignUpRequestDto.getFirebaseToken())
//                        .build());
//
//        return UserSignUpResponseDto.builder()
//                .userName(userSignUpRequestDto.getUserName())
//                .build();
//    }
//
//    @Transactional
//    public UserLoginResponseDto login(UserLoginRequestDto userLoginRequestDto) {
//        UsernamePasswordAuthenticationToken authenticationToken =
//                new UsernamePasswordAuthenticationToken(userLoginRequestDto.getUserCellNo(), userLoginRequestDto.getUserSimplePass());
//
//        Authentication authentication = jwtAuthenticationProvider.authenticate(authenticationToken);
//
//        JwtToken token = jwtUtil.createToken(authentication);
//
//        // DB에 있는 User 정보에서 userName 가져오기
//        User findUser = userRepository.findByUserCellNo(userLoginRequestDto.getUserCellNo())
//                .orElseThrow(()-> new RuntimeException("없어"));
//
//
//        return UserLoginResponseDto.builder()
//                .jwtToken(token)
//                .userName(findUser.getUserName())
//                .build();
//    }
//
//    @Transactional
//    public UserLogoutResponseDto logout(HttpServletRequest request) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        User findUserByAuthentication = userRepository.findByUserCellNo(authentication.getName())
//                        .orElseThrow(() -> new RuntimeException("없어"));
//
//        if (findUserByAuthentication.getUserPk() == jwtUtil.extractUserPkFromToken(request))
//            return UserLogoutResponseDto.builder()
//                    .message("로그아웃에 성공했습니다")
//                    .build();
//
//        return UserLogoutResponseDto.builder()
//                .message("비정상적인 요청입니다.")
//                .build();
//    }
//
//    @Transactional
//    public UserDeleteResponseDto deleteUser(HttpServletRequest request) {
//        try {
//            userRepository.deleteById(jwtUtil.extractUserPkFromToken(request));
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return UserDeleteResponseDto.builder()
//                .message("다음에 다시 만나자")
//                .build();
//    }
//
//    public UserSetPasswordResponseDto setPassword(HttpServletRequest request, UserSetPasswordRequestDto userSetPasswordRequestDto) {
//        User findUser = userRepository.findById(jwtUtil.extractUserPkFromToken(request))
//                .orElseThrow(() -> new RuntimeException("이런 사용자는 없어"));
//
//        findUser.setPassword(bCryptPasswordEncoder.encode(userSetPasswordRequestDto.getUserSimplePass()));
//
//        userRepository.save(findUser);
//
//        return UserSetPasswordResponseDto.builder()
//                .message("다시 로그인하시오")
//                .build();
//    }
//
//    public UserRefreshTokenResponseDto refreshToken(HttpServletRequest request) {
//
//        String refreshToken = jwtUtil.resolveToken(request);
//
//        return UserRefreshTokenResponseDto.builder()
//                .accessToken(jwtUtil.refreshAccessToken(refreshToken))
//                .build();
//    }
//
//    public UserGetInfoResponseDto getUserInfo(String userCellNo) {
//        User findUser = userRepository.findByUserCellNo(userCellNo).orElseThrow(() -> new RuntimeException("없어요"));
//        return UserGetInfoResponseDto.builder()
//                .firebaseToken(findUser.getUserFirebaseToken())
//                .isUserInfo(true)
//                .userName(findUser.getUserName())
//                .build();
//    }
//
//    public List<UserGetListResponseDto> getUserList(String userName) {
//        List<User> userList = userRepository.findAllByUserName(userName);
//
//        if (userList.isEmpty()) {
//            return new ArrayList<>();
//        }
//
//        List<UserGetListResponseDto> userGetListResponseDtoList = new ArrayList<>();
//
//        for (User user : userList) {
//            UserGetListResponseDto userGetListResponseDto = UserGetListResponseDto.builder()
//                    .userPk(user.getUserPk())
//                    .userCellNo(user.getUserCellNo())
//                    .userName(user.getUserName())
//                    .build();
//
//            userGetListResponseDtoList.add(userGetListResponseDto);
//        }
//
//        return userGetListResponseDtoList;
//    }
//}
