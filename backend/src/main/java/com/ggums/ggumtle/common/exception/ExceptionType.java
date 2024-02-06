package com.ggums.ggumtle.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionType {

    // locked
    FAILED_TO_ACQUIRE_LOCK(409, "락 획득에 실패했습니다."),
    INTERRUPTED_WHILE_WAITING_FOR_LOCK(500, "락을 기다리는 동안 인터럽트가 발생하였습니다"),

    // users
    NOT_FOUND_USER(401, "등록된 사용자가 없습니다."),
    NOT_VALID_USER(400, "등록된 사용자가 유효하지 않습니다."),
    ALREADY_EXIST_USER_EMAIL(409, "이미 존재하는 이메일입니다."),
    NOT_MATCHING_INFO(400, "회원 정보가 일치하지 않습니다."),
    NO_TOKEN(401, "토큰이 없습니다."),
    NOT_VALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    NOT_VALID_ROLE(403, "유저 권한이 부족합니다."),
    TOKEN_EXPIRED(401, "토큰이 만료되었습니다."),
    EMAIL_REQUEST_LIMIT_EXCEEDED(429, "이메일 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."),
    PASSWORD_REQUEST_LIMIT_EXCEEDED(429, "비밀번호 요청 한도를 초과하였습니다."),
    AUTHENTICATION_REQUEST_LIMIT_EXCEEDED(429, "인증요청 한도를 초과하였습니다."),
    VERIFICATION_CODE_EXPIRED(400, "인증 코드가 만료되었습니다. 새로운 코드를 요청해주세요."),
    VERIFICATION_CODE_MISMATCH(400, "인증 코드가 일치하지 않습니다. 다시 시도해주세요."),
    VERIFICATION_CODE_NOT_FOUND(400, "인증 코드를 찾을 수 없습니다. 다시 시도하거나 새로운 코드를 요청해주세요."),
    NICKNAME_EMPTY(400, "닉네임이 비어있습니다."),
    NICKNAME_TOO_LONG(400, "닉네임이 너무 깁니다. 최대 50자를 초과할 수 없습니다."),
    NICKNAME_DUPLICATE(409, "닉네임이 중복되었습니다."),
    INVALID_LOGIN(401, "아이디 또는 비밀번호가 일치하지 않습니다."),
    ACCOUNT_LOCKED(403, "계정이 잠겨있습니다."),
    SELF_SUBSCRIPTION_ATTEMPTED(400, "자기 자신을 구독할 수 없습니다."),

    // oauth
    OAUTH_AUTHORIZATION_CODE_INVALID(400,"인가코드가 유효하지 않습니다."),

    // bucket
    BUCKET_NOT_FOUND(404, "해당 버킷을 찾을 수 없습니다."),
    BUCKET_NOT_VALID(400, "버킷이 비공개입니다."),
    BUCKET_ALREADY_ACHIEVED(403, "이미 달성한 버킷입니다."),
    FILE_DELETION_FAILED(500, "파일 삭제에 실패했습니다."),
    DIRECTORY_CREATION_FAILED(500, "디렉토리 생성에 실패했습니다."),
    FILE_COPY_FAILED(500, "파일 복사에 실패했습니다."),
    FILE_NOT_FOUND(404, "해당 파일을 찾을 수 없습니다."),

    // review
    REVIEW_NOT_FOUND(404, "해당 후기를 찾을 수 없습니다."),
    REVIEW_NOT_VALID(400, "후기가 비공개입니다."),
    IMAGE_NOT_FOUND(404, "해당 이미지를 찾을 수 없습니다."),
    REVIEW_ALREADY_EXISTS(409, "해당 버킷의 리뷰가 이미 존재합니다."),

    // comment
    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다."),
    LIKE_NOT_FOUND(404, "좋아요를 하지 않은 댓글입니다."),
    ALREADY_EXIST_LIKE(400, "이미 좋아요한 댓글입니다."),

    // alarm
    ALARM_NOT_FOUND(404, "알람을 찾을 수 없습니다."),
    ALARM_NOT_VALID(400, "알람이 유효하지 않습니다."),

    // sse error
    SSE_EMITTER_ERROR(500, "SSE Emitter에서 오류가 발생했습니다."),

    ;

    private final int code;
    private final String msg;

    ExceptionType (int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
