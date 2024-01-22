package com.ggums.ggumtle.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionType {

    // jwt Token


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
    INVALID_LOGIN(401, "아이디 또는 비밀번호가 일치하지 않습니다."),
    ACCOUNT_LOCKED(403, "계정이 잠겨있습니다."),

    // bucket
    BUCKET_NOT_FOUND(404, "해당 버킷을 찾을 수 없습니다."),
    BUCKET_NOT_VALID(400, "버킷이 비공개입니다."),

    // review
    REVIEW_NOT_FOUND(404, "해당 후기를 찾을 수 없습니다."),
    REVIEW_NOT_VALID(400, "후기가 비공개입니다."),
    IMAGE_NOT_FOUND(404, "해당 이미지를 찾을 수 없습니다.")
    ;

    private final int code;
    private final String msg;

    ExceptionType (int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
