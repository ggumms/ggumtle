package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.constant.Score;
import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.common.handler.AlarmHandler;
import com.ggums.ggumtle.dto.request.CommentRequestDto;
import com.ggums.ggumtle.dto.response.CommentResponseDto;
import com.ggums.ggumtle.dto.response.model.CommentListDto;
import com.ggums.ggumtle.dto.response.model.UserListDto;
import com.ggums.ggumtle.entity.*;
import com.ggums.ggumtle.repository.CommentReviewLikeRepository;
import com.ggums.ggumtle.repository.FollowRepository;
import com.ggums.ggumtle.repository.ReviewRepository;
import com.ggums.ggumtle.repository.CommentReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentReviewService {

    private final AlarmHandler alarmHandler;
    private final ReviewRepository reviewRepository;
    private final CommentReviewRepository commentReviewRepository;
    private final CommentReviewLikeRepository commentReviewLikeRepository;
    private final FollowRepository followRepository;


    public String commentCreate(User user, long reviewId, CommentRequestDto requestDto) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()->new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        // 후기가 비공개일 경우 후기의 작성자가 아니면 댓글을 달 수 없다.
        if (review.getBucket().getIsPrivate() && !review.getBucket().getUser().getId().equals(user.getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        if (!review.getIsPosted()) {
            throw new CustomException(ExceptionType.TEMPORARY_REVIEW);
        }

        CommentReview commentReview = CommentReview.builder()
                .user(user)
                .review(review)
                .context(requestDto.getContext())
                .build();

        commentReviewRepository.save(commentReview);

        // user가 후기 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 증가
        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, review.getBucket().getUser());
        if (followOpt.isPresent()) {
            Follow follow = followOpt.get();
            Long currentScore = follow.getScore();
            follow.setScore(currentScore + Score.COMMENT);
        }

        alarmHandler.createCommentAlarm(review.getBucket().getUser(), user, AlarmType.commentReview, requestDto.getContext(), null, review);

        return "댓글이 생성되었습니다.";
    }

    @Transactional(readOnly = true)
    public CommentResponseDto commentList(User user, long reviewId, Pageable pageable) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()->new CustomException(ExceptionType.REVIEW_NOT_FOUND));

        // 후기가 비공개일 경우 후기의 작성자가 아니면 댓글 리스트를 조회할 수 없다.
        if (review.getBucket().getIsPrivate() && !review.getBucket().getUser().getId().equals(user.getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        if (!review.getIsPosted()) {
            throw new CustomException(ExceptionType.TEMPORARY_REVIEW);
        }

        Page<CommentReview> comments = commentReviewRepository.findByReview(review, pageable);
        return CommentResponseDto.builder().commentList(comments.map(this::convertToCommentResponseDto)).build();
    }

    private CommentListDto convertToCommentResponseDto(CommentReview item) {

        User writer = item.getUser();

        Bucket repBucket = writer.getRepBucket();
        Long repBucketId = null;
        String repBucketTitle = null;
        String repBucketColor = null;
        Boolean isRepBucketAchieved = null;
        if (repBucket != null) {    // 대표버킷이 있는 경우
            repBucketId = repBucket.getId();
            repBucketTitle = repBucket.getTitle();
            repBucketColor = repBucket.getColor();
            isRepBucketAchieved = repBucket.getAchievementDate() != null;
        }

        UserListDto writerDto = UserListDto.builder()
                .userId(writer.getId())
                .userProfileImage(writer.getUserProfileImage())
                .userNickname(writer.getUserNickname())
                .bucketId(repBucketId)
                .bucketTitle(repBucketTitle)
                .bucketColor(repBucketColor)
                .isAchieved(isRepBucketAchieved)
                .build();


        String timeUnit;
        long time;

        if(ChronoUnit.YEARS.between(item.getCreatedDate(), LocalDateTime.now()) >= 1){
            timeUnit = "year";
            time = ChronoUnit.YEARS.between(item.getCreatedDate(), LocalDateTime.now());
        }else if(ChronoUnit.MONTHS.between(item.getCreatedDate(), LocalDateTime.now()) >= 1){
            timeUnit = "month";
            time = ChronoUnit.MONTHS.between(item.getCreatedDate(), LocalDateTime.now());
        }else if(ChronoUnit.WEEKS.between(item.getCreatedDate(), LocalDateTime.now()) >= 1){
            timeUnit = "week";
            time = ChronoUnit.WEEKS.between(item.getCreatedDate(), LocalDateTime.now());
        }else if(ChronoUnit.DAYS.between(item.getCreatedDate(), LocalDateTime.now()) >= 1){
            timeUnit = "day";
            time = ChronoUnit.DAYS.between(item.getCreatedDate(), LocalDateTime.now());
        }else if(ChronoUnit.HOURS.between(item.getCreatedDate(), LocalDateTime.now()) >= 1){
            timeUnit = "hour";
            time = ChronoUnit.HOURS.between(item.getCreatedDate(), LocalDateTime.now());
        }else{
            timeUnit = "min";
            time = ChronoUnit.MINUTES.between(item.getCreatedDate(), LocalDateTime.now());
        }

        return CommentListDto.builder()
                .id(item.getId())
                .context(item.getContext())
                .writer(writerDto)
                .numberOfLikes(item.getCommentReviewLikes().size())
                .timeUnit(timeUnit)
                .time(time)
                .createdDate(item.getCreatedDate())
                .updatedDate(item.getUpdatedDate())
                .build();
    }

    public String commentDelete(User user, long commentId) {

        CommentReview comment = commentReviewRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 요청한 사용자와 댓글 작성자가 다르면 오류 반환
        if (!(comment.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        // 후기가 비공개인데 user가 후기의 주인이 아닌 경우 예외 처리
        if (comment.getReview().getBucket().getIsPrivate() && !user.getId().equals(comment.getReview().getBucket().getUser().getId())) {
            throw new CustomException(ExceptionType.REVIEW_NOT_VALID);
        }

        if (!comment.getReview().getIsPosted()) {
            throw new CustomException(ExceptionType.TEMPORARY_REVIEW);
        }

        commentReviewRepository.delete(comment);

        // user가 후기 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 감소
        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, comment.getReview().getBucket().getUser());
        if (followOpt.isPresent()) {
            Follow follow = followOpt.get();
            Long currentScore = follow.getScore();
            follow.setScore(Math.max(currentScore - Score.COMMENT, 0L));
        }

        return "댓글이 삭제되었습니다.";
    }

    public String commentUpdate(User user, CommentRequestDto requestDto, long commentId) {

        CommentReview comment = commentReviewRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 요청한 사용자와 댓글 작성자가 다르면 오류 반환
        if (!(comment.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        // 후기가 비공개인데 user가 후기의 주인이 아닌 경우 예외 처리
        if (comment.getReview().getBucket().getIsPrivate() && !user.getId().equals(comment.getReview().getBucket().getUser().getId())) {
            throw new CustomException(ExceptionType.REVIEW_NOT_VALID);
        }

        if (!comment.getReview().getIsPosted()) {
            throw new CustomException(ExceptionType.TEMPORARY_REVIEW);
        }

        comment.update(requestDto.getContext());
        return "댓글이 수정되었습니다.";
    }

    public String commentLike(User user, long commentId) {

        CommentReview commentReview = commentReviewRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 후기의 작성자가 아닌 경우 해당 후기에 달린 댓글에 좋아요를 누를 수 없다.
        if (!commentReview.getReview().getBucket().getUser().getId().equals(user.getId())) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        if (!commentReview.getReview().getIsPosted()) {
            throw new CustomException(ExceptionType.TEMPORARY_REVIEW);
        }

        //todo 좋아요 확장 시, 사용자 validation 변경 필요

        Optional<CommentReviewLike> like = commentReviewLikeRepository
                .findByCommentReviewAndUser(commentReview, user);

        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, commentReview.getUser());

//      만약에 해당 유저가 이미 좋아요를 눌렀다면 좋아요 취소
        if (like.isPresent()) {
            commentReviewLikeRepository.delete(like.get());

            // user가 댓글 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 감소
            if (followOpt.isPresent()) {
                Follow follow = followOpt.get();
                Long currentScore = follow.getScore();
                follow.setScore(Math.max(currentScore - Score.COMMENT_LIKE, 0L));
            }

            return "좋아요가 취소되었습니다.";
        }
        // 아니면 좋아요 추가
        else {
            CommentReviewLike newLike = CommentReviewLike.builder()
                    .user(user)
                    .commentReview(commentReview)
                    .build();

            commentReviewLikeRepository.save(newLike);

            // user가 댓글 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 증가
            if (followOpt.isPresent()) {
                Follow follow = followOpt.get();
                Long currentScore = follow.getScore();
                follow.setScore(currentScore + Score.COMMENT_LIKE);
            }

            alarmHandler.createReviewAlarm(commentReview.getUser(), user, AlarmType.likeCommentReview, commentReview.getReview());

            return "좋아요가 생성되었습니다.";
        }
    }
}
