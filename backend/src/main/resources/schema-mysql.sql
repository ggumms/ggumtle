create table `user`
(
    id                 bigint not null auto_increment,
    rep_bucket_id      bigint unique,
    deleted_date       datetime(6),
    user_nickname      varchar(255),
    user_profile_image varchar(255),
    gender             enum ('Male','Female'),
    birth_date         date,
    alarm              bit(1),
    created_date       datetime(6) not null,
    updated_date       datetime(6) not null,
    primary key (id)
) engine=InnoDB;


create table bucket
(
    id               bigint not null auto_increment,
    user_id          bigint,
    achievement_date date,
    is_private       bit,
    title            varchar(100),
    time_capsule     varchar(1000),
    color            varchar(255),
    bucket_picture   varchar(255),
    reminder_date    enum ('oneDay','oneWeek', 'twoWeeks', 'oneMonth', 'oneYear'),
    latitude         float(53),
    longitude        float(53),
    address          varchar(255),
    created_date     datetime(6),
    primary key (id)
) engine=InnoDB;

alter table `user` add constraint FKg5k0gvvnf1sijrmcnykg2rqdo
    foreign key (rep_bucket_id) references bucket (id) ON DELETE SET NULL;

alter table bucket add constraint FKql6bmsmds3jinwe5uvlwx11cs
    foreign key (user_id) references user (id);


create table interest
(
    id   bigint not null auto_increment,
    name varchar(255),
    primary key (id)
) engine=InnoDB;


create table bucket_interest
(
    bucket_id   bigint not null,
    interest_id bigint not null,
    primary key (bucket_id, interest_id),
    foreign key (bucket_id) references bucket (id) on delete cascade,
    foreign key (interest_id) references interest (id)
) engine=InnoDB;


create table bucket_reaction
(
    id        bigint not null auto_increment,
    user_id   bigint,
    bucket_id bigint,
    reaction  varchar(255),
    primary key (id),
    foreign key (user_id) references `user` (id),
    foreign key (bucket_id) references bucket (id) on delete cascade
) engine=InnoDB;


create table comment_bucket
(
    id           bigint not null auto_increment,
    user_id      bigint,
    bucket_id    bigint,
    context      varchar(1000),
    created_date datetime(6) not null,
    updated_date datetime(6) not null,
    primary key (id),
    foreign key (user_id) references `user` (id),
    foreign key (bucket_id) references bucket (id) on delete cascade
) engine=InnoDB;


create table comment_bucket_like
(
    id         bigint not null auto_increment,
    user_id    bigint,
    comment_id bigint,
    primary key (id),
    foreign key (user_id) references `user` (id),
    foreign key (comment_id) references comment_bucket (id) on delete cascade
) engine=InnoDB;


create table review
(
    id           bigint not null auto_increment,
    bucket_id    bigint,
    title        varchar(100),
    context      LONGTEXT,
    created_date datetime(6) not null,
    updated_date datetime(6) not null,
    primary key (id),
    foreign key (bucket_id) references bucket (id) on delete cascade
) engine=InnoDB;


create table comment_review
(
    id           bigint not null auto_increment,
    review_id    bigint,
    user_id      bigint,
    context      varchar(1000),
    created_date datetime(6) not null,
    updated_date datetime(6) not null,
    primary key (id),
    foreign key (review_id) references review (id) on delete cascade,
    foreign key (user_id) references `user` (id)
) engine=InnoDB;


create table comment_review_like
(
    id         bigint not null auto_increment,
    comment_id bigint,
    user_id    bigint,
    primary key (id),
    foreign key (comment_id) references comment_review (id) on delete cascade,
    foreign key (user_id) references `user` (id)
) engine=InnoDB;


create table follow
(
    id          bigint not null auto_increment,
    follower_id bigint,
    followee_id bigint,
    score       bigint,
    primary key (id),
    foreign key (follower_id) references `user` (id),
    foreign key (followee_id) references `user` (id)
) engine=InnoDB;


create table review_reaction
(
    id        bigint not null auto_increment,
    user_id   bigint,
    review_id bigint,
    reaction  varchar(255),
    primary key (id),
    foreign key (user_id) references `user` (id),
    foreign key (review_id) references review (id) on delete cascade
) engine=InnoDB;


create table user_interest
(
    interest_id bigint not null,
    user_id     bigint not null,
    primary key (interest_id, user_id),
    foreign key (interest_id) references interest (id),
    foreign key (user_id) references `user` (id)
) engine=InnoDB;


CREATE TABLE alarm
(
    id           BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    is_read      BIT(1),
    created_date DATETIME(6) NOT NULL,
    data_id      BIGINT,
    receiver_id  BIGINT NOT NULL,
    sender_id    BIGINT,
    context      VARCHAR(1000),
    `type`       ENUM('likeCommentBucket', 'remind', 'followBucket', 'follow', 'followBucketAchieve', 'commentBucket', 'join', 'likeCommentReview', 'followReview', 'commentReview', 'bucketReaction', 'reviewReaction'),
    foreign key (receiver_id) references `user` (id),
    foreign key (sender_id) references `user` (id)
);


CREATE TABLE timeline
(
    id           BIGINT NOT NULL AUTO_INCREMENT,
    user_id      BIGINT NOT NULL,
    `type`       ENUM('BUCKET', 'REVIEW'),
    bucket_id    BIGINT,
    review_id    BIGINT,
    is_achieved  bit,
    is_private   bit,
    created_date datetime(6) not null,
    primary key (id),
    foreign key (user_id) references `user` (id),
    foreign key (bucket_id) references `bucket` (id) on delete cascade,
    foreign key (review_id) references `review` (id) on delete cascade
);