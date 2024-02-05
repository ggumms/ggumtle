package com.ggums.ggumtle.repository;

import com.ggums.ggumtle.entity.Timeline;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface TimelineCustomRepository {

    @Transactional(readOnly = true)
    Page<Timeline> get(Long currentUserId, Long userId, Boolean doing, Boolean done, Boolean review, Pageable pageable);
}
