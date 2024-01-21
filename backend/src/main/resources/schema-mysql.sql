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

-- Review Table
create table review (
    id           bigint not null auto_increment,
    title        VARCHAR(255),
    context      LONGTEXT,
    created_date datetime(6) not null,
    updated_date datetime(6) not null,
    primary key (id)
);