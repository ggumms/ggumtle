package com.ggums.ggumtle.service;

import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserApiService {

    private final UserRepository userRepository;

    public Boolean isNicknameDuplicate(String nickname){
        Optional<User> user = userRepository.findByUserNickname(nickname);
        return user.isPresent();
    }
}
