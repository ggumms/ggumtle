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
import com.ggums.ggumtle.repository.BucketRepository;
import com.ggums.ggumtle.repository.CommentBucketLikeRepository;
import com.ggums.ggumtle.repository.CommentBucketRepository;
import com.ggums.ggumtle.repository.FollowRepository;
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
public class CommentBucketService {

    private final AlarmHandler alarmHandler;
    private final BucketRepository bucketRepository;
    private final CommentBucketRepository commentBucketRepository;
    private final CommentBucketLikeRepository commentBucketLikeRepository;
    private final FollowRepository followRepository;

    public String commentCreate(User user, long bucketId, CommentRequestDto requestDto) {

        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(()->new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        // 비공개 버킷일 경우, 버킷 작성자만 댓글을 달 수 있다.
        if (bucket.getIsPrivate() && !(bucket.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        CommentBucket commentBucket = CommentBucket.builder()
                .user(user)
                .bucket(bucket)
                .context(requestDto.getContext())
                .build();

        commentBucketRepository.save(commentBucket);

        // user가 버킷 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 증가
        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, bucket.getUser());
        if (followOpt.isPresent()) {
            Follow follow = followOpt.get();
            Long currentScore = follow.getScore();
            follow.setScore(currentScore + Score.COMMENT);
        }

        alarmHandler.createBucketAlarm(bucket.getUser(), user, AlarmType.commentBucket, bucket);

        return "댓글이 생성되었습니다.";
    }

    @Transactional(readOnly = true)
    public CommentResponseDto commentList(User user, long bucketId, Pageable pageable) {

        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(()->new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        // 비공개일 때, 요청한 사용자와 버켓 글쓴이가 다르면 오류 반환
        if (bucket.getIsPrivate() && !(bucket.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        Page<CommentBucket> comments = commentBucketRepository.findByBucket(bucket, pageable);
        return CommentResponseDto.builder().commentList(comments.map(this::convertToCommentResponseDto)).build();
    }

    private CommentListDto convertToCommentResponseDto(CommentBucket item) {

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
                .numberOfLikes(item.getCommentBucketLikes().size())
                .timeUnit(timeUnit)
                .time(time)
                .createdDate(item.getCreatedDate())
                .updatedDate(item.getUpdatedDate())
                .build();
    }

    public String commentDelete(User user, long commentId) {

        CommentBucket comment = commentBucketRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 요청한 사용자와 댓글 작성자가 다르면 오류 반환
        if (!(comment.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        // 버킷이 비공개인데 user가 버킷의 주인이 아닌 경우 예외 처리
        if (comment.getBucket().getIsPrivate() && !user.getId().equals(comment.getBucket().getUser().getId())) {
            throw new CustomException(ExceptionType.BUCKET_NOT_VALID);
        }

        commentBucketRepository.delete(comment);

        // user가 버킷 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 감소
        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, comment.getBucket().getUser());
        if (followOpt.isPresent()) {
            Follow follow = followOpt.get();
            Long currentScore = follow.getScore();
            follow.setScore(Math.max(currentScore - Score.COMMENT, 0L));
        }

        return "댓글이 삭제되었습니다.";
    }

    public String commentUpdate(User user, CommentRequestDto requestDto, long commentId) {

        CommentBucket comment = commentBucketRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 요청한 사용자와 댓글 작성자가 다르면 오류 반환
        if (!(comment.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        // 버킷이 비공개인데 user가 버킷의 주인이 아닌 경우 예외 처리
        if (comment.getBucket().getIsPrivate() && !user.getId().equals(comment.getBucket().getUser().getId())) {
            throw new CustomException(ExceptionType.BUCKET_NOT_VALID);
        }

        comment.update(requestDto.getContext());
        return "댓글이 수정되었습니다.";
    }

    public String commentLike(User user, long commentId) {

        CommentBucket commentBucket = commentBucketRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 아직은 버킷의 작성자만이 해당 버켓의 댓글에 좋아요를 누를 수 있음
        // 만약 해당 댓글이 달린 버켓의 작성자와 현재 요청하는 사용자가 다를 경우 오류 반환
        if(!commentBucket.getBucket().getUser().getId().equals(user.getId())){
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        //todo 좋아요 확장 시, 사용자 validation 변경 필요

        Optional<CommentBucketLike> like = commentBucketLikeRepository
                .findByCommentBucketAndUser(commentBucket, user);

        Optional<Follow> followOpt = followRepository.findByFollowerAndFollowee(user, commentBucket.getUser());

//      만약에 해당 유저가 이미 좋아요를 눌렀다면 좋아요 취소
        if (like.isPresent()) {
            commentBucketLikeRepository.delete(like.get());

            // user가 댓글 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 감소
            if (followOpt.isPresent()) {
                Follow follow = followOpt.get();
                Long currentScore = follow.getScore();
                follow.setScore(Math.max(currentScore - Score.COMMENT_LIKE, 0L));
            }

            return "좋아요가 취소되었습니다.";
        }
        // 아니면 좋아요 추가
        else{
            CommentBucketLike newLike = CommentBucketLike.builder()
                    .user(user)
                    .commentBucket(commentBucket)
                    .build();

            commentBucketLikeRepository.save(newLike);

            // user가 댓글 작성자(writer)를 팔로우하고 있는 경우 user -> writer 친밀도 증가
            if (followOpt.isPresent()) {
                Follow follow = followOpt.get();
                Long currentScore = follow.getScore();
                follow.setScore(currentScore + Score.COMMENT_LIKE);
            }

            alarmHandler.createBucketAlarm(commentBucket.getUser(), user, AlarmType.likeCommentBucket, commentBucket.getBucket());

            return "좋아요가 생성되었습니다.";
        }

    }
}

