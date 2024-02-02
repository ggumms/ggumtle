package com.ggums.ggumtle.service;

import com.ggums.ggumtle.dto.response.model.TimelineDto;
import com.ggums.ggumtle.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class TimelineService {


    public Page<TimelineDto> get(User user, Boolean doing, Boolean done, Boolean review, Pageable pageable) {
        return null;
    }
}
