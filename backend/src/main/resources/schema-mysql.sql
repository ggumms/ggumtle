-- User Table
CREATE TABLE user (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_nickname VARCHAR(255),
    user_profile_image VARCHAR(255),
    birth_date DATE,
    gender ENUM('Male', 'Female'),
    deleted_date DATETIME(6),
    created_date DATETIME(6) NOT NULL,
    updated_date DATETIME(6) NOT NULL,
    PRIMARY KEY (id)
);

-- Bucket Table
CREATE TABLE bucket (
    achievement_date DATE,
    is_private BIT(1),
    created_date DATETIME(6) NOT NULL,
    id BIGINT NOT NULL AUTO_INCREMENT,
    latitude BIGINT,
    longitude BIGINT,
    updated_date DATETIME(6) NOT NULL,
    user_id BIGINT,
    address VARCHAR(255),
    bucket_picture VARCHAR(255),
    color VARCHAR(255),
    time_capsule VARCHAR(255),
    title VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Interest table
CREATE TABLE my_table (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
);

-- Bucket Reaction table
CREATE TABLE reactions (
    bucket_id BIGINT,
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    reaction VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (bucket_id) REFERENCES bucket(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);


