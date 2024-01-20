-- User Table
create table user (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_nickname VARCHAR(255),
    user_profile_image VARCHAR(255),
    birth_date DATE,
    gender VARCHAR(10),
    deleted_date DATETIME(6),
    created_date DATETIME(6) NOT NULL,
    updated_date DATETIME(6) NOT NULL,
    PRIMARY KEY (id)
);