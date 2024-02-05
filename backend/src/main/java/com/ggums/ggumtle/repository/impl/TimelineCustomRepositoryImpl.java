package com.ggums.ggumtle.repository.impl;

import com.ggums.ggumtle.entity.QTimeline;
import com.ggums.ggumtle.entity.Timeline;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.TimelineCustomRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

@RequiredArgsConstructor
public class TimelineCustomRepositoryImpl implements TimelineCustomRepository {

    private final JPAQueryFactory queryFactory;
    private final QTimeline timeline = QTimeline.timeline;

    @Override
    public Page<Timeline> get(Long userId, Boolean doing, Boolean done, Boolean review, Pageable pageable) {
        BooleanBuilder predicate = new BooleanBuilder();
        predicate.and(timeline.user.id.eq(userId));
        predicate.and(timeline.bucket.isPrivate.eq(Boolean.FALSE));

        BooleanBuilder orPredicate = new BooleanBuilder();
        if (doing) {
            orPredicate.or(timeline.bucket.achievementDate.isNull());
        }
        if (done) {
            orPredicate.or(timeline.bucket.achievementDate.isNotNull());
        }
        if (review) {
            orPredicate.or(timeline.review.isNotNull());
        }

        predicate.and(orPredicate);

        OrderSpecifier<?>[] orderBys = new OrderSpecifier[]{
                timeline.createdDate.desc()
        };

        List<Timeline> timelines = queryFactory.selectFrom(timeline)
                .where(predicate)
                .orderBy(orderBys)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> count = queryFactory.select(timeline.count())
                .from(timeline)
                .where(predicate);

        return PageableExecutionUtils.getPage(timelines, pageable, count::fetchOne);
    }
}
