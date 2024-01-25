package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.CommentRequestDto;
import com.ggums.ggumtle.dto.response.CommentResponseDto;
import com.ggums.ggumtle.entity.Review;
import com.ggums.ggumtle.entity.CommentReview;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.ReviewRepository;
import com.ggums.ggumtle.repository.CommentReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentReviewService {

    private final ReviewRepository reviewRepository;
    private final CommentReviewRepository commentReviewRepository;

    public String commentCreate(User user, long reviewId, CommentRequestDto requestDto) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()->new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        CommentReview commentReview = CommentReview.builder()
                .user(user)
                .review(review)
                .context(requestDto.getContext())
                .build();

        commentReviewRepository.save(commentReview);
        return "댓글이 생성되었습니다.";
    }

    @Transactional(readOnly = true)
    public Page<CommentResponseDto> commentList(User user, long reviewId, Pageable pageable) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()->new CustomException(ExceptionType.BUCKET_NOT_FOUND));

//        // 비공개일 때, 요청한 사용자와 버켓 글쓴이가 다르면 오류 반환
//        if (review.getIsPrivate() && !(review.getUser().getId().equals(user.getId()))) {
//            throw new CustomException(ExceptionType.NOT_VALID_USER);
//        }

        Page<CommentReview> comments = commentReviewRepository.findByReview(review, pageable);
        return comments.map(this::convertToCommentResponseDto);
    }

    private CommentResponseDto convertToCommentResponseDto(CommentReview item) {

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

        return CommentResponseDto.builder()
                .id(item.getId())
                .userId(item.getUser().getId())
                .userNickname(item.getUser().getUserNickname())
                .context(item.getContext())
                .createdDate(item.getCreatedDate())
                .updatedDate(item.getUpdatedDate())
                .timeUnit(timeUnit)
                .time(time)
                .numberOfLikes(item.getCommentReviewLikes().size())
                .build();
    }

    public String commentDelete(User user, long commentId) {

        CommentReview comment = commentReviewRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 요청한 사용자와 댓글 작성자가 다르면 오류 반환
        if (!(comment.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        commentReviewRepository.delete(comment);
        return "댓글이 삭제되었습니다.";
    }

    public String commentUpdate(User user, CommentRequestDto requestDto, long commentId) {

        CommentReview comment = commentReviewRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 요청한 사용자와 댓글 작성자가 다르면 오류 반환
        if (!(comment.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        comment.update(requestDto.getContext());
        return "댓글이 수정되었습니다.";
    }
}
