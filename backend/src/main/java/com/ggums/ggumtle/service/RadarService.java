package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.response.RadarBucketDto;
import com.ggums.ggumtle.dto.response.model.UserListDto;
import com.ggums.ggumtle.entity.Bucket;
import com.ggums.ggumtle.entity.Follow;
import com.ggums.ggumtle.entity.Interest;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.BucketRepository;
import com.ggums.ggumtle.repository.FollowRepository;
import com.ggums.ggumtle.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class RadarService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final BucketRepository bucketRepository;


    public Map<String, Object> getFollowing(User user) throws Exception {

        Map<String, Object> radar = new HashMap<>();

        List<Follow> followeeList = followRepository.findByFollowerOrderByScoreDesc(user);
        makeCircle(radar, followeeList);

        return radar;
    }

    public Map<String, Object> getTotalInit(User user) {
        User owner = userRepository.findById(user.getId()).orElseThrow(() -> new CustomException(ExceptionType.NOT_FOUND_USER));

        List<String> categories = new ArrayList<>();

        for (Interest interest : owner.getUserInterest()) {
            categories.add(interest.getName());
        }

        return getTotalMap(categories);
    }

    public Map<String, Object> getTotal(User user, List<String> categories) {
        return getTotalMap(categories);
    }

    private Map<String, Object> getTotalMap(List<String> categories) {
        Map<String, Object> map = new HashMap<>();

        List<Bucket> buckets = bucketRepository.findByIdIn(bucketRepository.getTotal(categories));

        List<RadarBucketDto> allList = new ArrayList<>();
        for (Bucket bucket : buckets) {
            allList.add(RadarBucketDto.builder()
                    .bucketId(bucket.getId())
                    .title(bucket.getTitle())
                    .bucketPicture(bucket.getBucketPicture())
                    .color(bucket.getColor())
                    .build());
        }

        List<RadarBucketDto> bucketList1 = new ArrayList<>();    // 1 circle (3)
        List<RadarBucketDto> bucketList2 = new ArrayList<>();    // 2 circle (4)
        List<RadarBucketDto> bucketList3 = new ArrayList<>();    // 3 circle (5)

        int size = allList.size();
        int idx = 0;
        while (idx < 12 && idx < size) {
            if (idx < 3) bucketList1.add(allList.get(idx));
            else if (idx < 7) bucketList2.add(allList.get(idx));
            else bucketList3.add(allList.get(idx));
            idx++;
        }

        map.put("circle1", bucketList1);
        map.put("circle2", bucketList2);
        map.put("circle3", bucketList3);
        return map;
    }

    public static void makeCircle(Map<String, Object> radar, List<Follow> followeeList) {
        // TODO : refactor for constant
        int size = followeeList.size();
        radar.put("refresh", size > 12);

        List<UserListDto> allList = new ArrayList<>();

        for (Follow follow : followeeList) {
            User followee = follow.getFollowee();
            allList.add(UserListDto.builder()
                    .userId(followee.getId())
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
            int circle1Idx = (int) (size * ((float) 3 / 12));
            int circle2Idx = (int) (size * ((float) 7 / 12));
            int circle3Idx = size - 1;
            boolean[] visited = new boolean[size];

            // TODO : refactor
            while (idx < 12) {
                if (idx < 3) {
                    int tempIdx = (int) (Math.random() * (circle1Idx + 1));
                    if (visited[tempIdx]) continue;
                    userList1.add(allList.get(tempIdx));
                    visited[tempIdx] = true;
                } else if (idx < 7) {
                    int tempIdx = (int) (Math.random() * (circle2Idx - circle1Idx + 1)) + circle1Idx;
                    if (visited[tempIdx]) continue;
                    userList2.add(allList.get(tempIdx));
                    visited[tempIdx] = true;
                } else {
                    int tempIdx = (int) (Math.random() * (circle3Idx - circle2Idx + 1)) + circle2Idx;
                    if (visited[tempIdx]) continue;
                    userList3.add(allList.get(tempIdx));
                    visited[tempIdx] = true;
                }
                idx++;
            }
        }

        radar.put("circle1", userList1);
        radar.put("circle2", userList2);
        radar.put("circle3", userList3);
    }
}
