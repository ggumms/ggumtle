package com.ggums.ggumtle.service;

import com.ggums.ggumtle.dto.response.model.UserListDto;
import com.ggums.ggumtle.entity.Follow;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.FollowRepository;
import com.ggums.ggumtle.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class RadarService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    public Map<String, Object> getFollowing(User user) throws Exception {

        Map<String, Object> radar = new HashMap<>();

        List<Follow> followeeList = followRepository.findByFollower(user);
        makeCircle(radar, followeeList);

        return radar;
    }

    public Object getTotal() {
        // TODO : ing...
        return null;
    }

    public static void makeCircle(Map<String, Object> radar, List<Follow> followeeList) {
        // TODO : refactor for constant
        int size = followeeList.size();
        radar.put("refresh", size > 12);

        List<UserListDto> allList = new ArrayList<>();

        for (Follow follow : followeeList) {
            User followee = follow.getFollowee();
            allList.add(UserListDto.builder()
                    .userId(follow.getId())
                    .userNickname(followee.getUserNickname())
                    .userProfileImage(followee.getUserProfileImage())
                    .build());
        }

        List<UserListDto> userList1 = new ArrayList<>();    // 1 circle (3)
        List<UserListDto> userList2 = new ArrayList<>();    // 2 circle (4)
        List<UserListDto> userList3 = new ArrayList<>();    // 3 circle (5)

        if (size < 12) {
            int idx = 0;
            while (idx < size) {
                if (idx < 3) userList1.add(allList.get(idx));
                else if (idx < 7) userList2.add(allList.get(idx));
                else userList3.add(allList.get(idx));
                idx++;
            }
        } else {
            int idx = 0;
            int circle1Idx = (int) (size * (float) (3 / 12));
            int circle2Idx = (int) (size * (float) (7 / 12));
            int circle3Idx = size - 1;
            boolean[] visited = new boolean[size];

            while (idx < size) {
                int randomIdx = (int) (Math.random() * 100);
                if (idx < 3) {
                    if (visited[randomIdx % circle1Idx]) continue;
                    userList1.add(allList.get(randomIdx % circle1Idx));
                    visited[randomIdx % circle1Idx] = true;
                } else if (idx < 7) {
                    if (visited[randomIdx % circle2Idx]) continue;
                    userList2.add(allList.get(randomIdx % circle2Idx));
                    visited[randomIdx % circle2Idx] = true;
                } else {
                    if (visited[randomIdx % circle3Idx]) continue;
                    userList3.add(allList.get(randomIdx % circle3Idx));
                    visited[randomIdx % circle3Idx] = true;
                }
                idx++;
            }
        }

        radar.put("circle1", userList1);
        radar.put("circle2", userList2);
        radar.put("circle3", userList3);
    }
}
