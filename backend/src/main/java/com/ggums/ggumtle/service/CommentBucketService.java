package com.ggums.ggumtle.service;


import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.request.CommentRequestDto;
import com.ggums.ggumtle.dto.response.CommentResponseDto;
import com.ggums.ggumtle.entity.Bucket;
import com.ggums.ggumtle.entity.CommentBucket;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.BucketRepository;
import com.ggums.ggumtle.repository.CommentBucketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentBucketService {

    private final BucketRepository bucketRepository;
    private final CommentBucketRepository commentBucketRepository;

    public String commentCreate(User user, long bucketId, CommentRequestDto requestDto) {

        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(()->new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        CommentBucket commentBucket = CommentBucket.builder()
                .user(user)
                .bucket(bucket)
                .context(requestDto.getContext())
                .build();

        commentBucketRepository.save(commentBucket);
        return "댓글이 생성되었습니다.";
    }

    @Transactional(readOnly = true)
    public Page<CommentResponseDto> commentList(User user, long bucketId, Pageable pageable) {

        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(()->new CustomException(ExceptionType.BUCKET_NOT_FOUND));

        // 비공개일 때, 요청한 사용자와 버켓 글쓴이가 다르면 오류 반환
        if (bucket.getIsPrivate() && !(bucket.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        Page<CommentBucket> comments = commentBucketRepository.findByBucket(bucket, pageable);
        return comments.map(this::convertToCommentResponseDto);
    }

    private CommentResponseDto convertToCommentResponseDto(CommentBucket item) {
        return CommentResponseDto.builder()
                .id(item.getId())
                .userId(item.getUser().getId())
                .userNickname(item.getUser().getUserNickname())
                .context(item.getContext())
                .createdDate(item.getCreatedDate())
                .updatedDate(item.getUpdatedDate())
                .numberOfLikes(item.getCommentBucketLikes().size())
                .build();
    }

    public String commentDelete(User user, long commentId) {

        CommentBucket comment = commentBucketRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 요청한 사용자와 댓글 작성자가 다르면 오류 반환
        if (!(comment.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        commentBucketRepository.delete(comment);
        return "댓글이 삭제되었습니다.";
    }

    public String commentUpdate(User user, CommentRequestDto requestDto, long commentId) {

        CommentBucket comment = commentBucketRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ExceptionType.COMMENT_NOT_FOUND));

        // 요청한 사용자와 댓글 작성자가 다르면 오류 반환
        if (!(comment.getUser().getId().equals(user.getId()))) {
            throw new CustomException(ExceptionType.NOT_VALID_USER);
        }

        comment.update(requestDto.getContext());
        return "댓글이 수정되었습니다.";
    }
}

