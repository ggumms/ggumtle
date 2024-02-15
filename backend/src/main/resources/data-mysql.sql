-- Dummy User for development
INSERT INTO user (user_nickname, user_profile_image, birth_date, gender, alarm, deleted_date, created_date,
                  updated_date)
VALUES ('서준호', 'profile1.jpg', '1997-05-15', 'Male', 1, NULL, '2024-01-24 08:00:00', '2024-01-24 08:00:00'),
       ('신창엽', 'profile2.jpg', '1995-08-22', 'Male', 1, NULL, '2024-01-24 09:15:00', '2024-01-24 09:15:00'),
       ('이우성', 'profile3.jpg', '1996-11-10', 'Male', 1, NULL, '2024-01-24 10:30:00', '2024-01-24 10:30:00'),
       ('이원주', 'profile4.jpg', '1999-03-03', 'Female', 0, NULL, '2024-01-24 11:45:00', '2024-01-24 11:45:00'),
       ('전지환', 'profile5.jpg', '1998-09-18', 'Male', 0, NULL, '2024-01-24 12:00:00', '2024-01-24 12:00:00'),
       ('조인화', 'profile6.jpg', '1998-06-26', 'Male', 0, NULL, '2024-01-24 12:30:00', '2024-01-24 12:30:00');


-- Dummy Bucket for development
INSERT INTO bucket (user_id, title, time_capsule, bucket_picture, reminder_date, latitude, longitude, color, address,
                    is_private, achievement_date, created_date)
VALUES (1, 'Visit Golden Gate Bridge', '꼭 가고야 말겠어', 'bucket1.jpg', 'oneDay', 37.7749, -122.4194, 'Blue',
        'San Francisco, CA', 0, '2024-01-23', '2023-01-24 00:00:00'),
       (2, 'Explore Hollywood Walk of Fame', '할리우드는 얼마나 멋질까...', 'bucket2.jpg', 'oneWeek', 34.0522, -118.2437, 'Green',
        'Los Angeles, CA', 1, '2024-01-24', '2023-01-24 00:00:00'),
       (3, 'Visit Times Square', '죽기 전엔 갈 수 있을까', 'bucket3.jpg', 'twoWeeks', 40.7128, -74.0060, 'Red', 'New York, NY',
        0, '2024-01-25', '2023-01-24 00:00:00'),
       (4, 'See the Bean at Millennium Park', '꼭 이루고 싶다!', 'bucket4.jpg', 'oneMonth', 41.8781, -87.6298, 'Yellow',
        'Chicago, IL', 1, '2024-01-26', '2023-01-24 00:00:00'),
       (5, 'Try the famous BBQ joints', '지환아 넌 무조건 성공해서 이 메세지를 보고 있을거야', 'bucket5.jpg', 'oneYear', 32.7767, -96.7970,
        'Purple', 'Dallas, TX', 0, '2024-01-27', '2023-01-23 00:00:00'),
       (6, 'Visit the Grand Canyon', '내 눈으로 직접 보고 싶어', 'bucket6.jpg', 'oneYear', 36.1069, -112.1129, 'Orange',
        'Grand Canyon Village, AZ', 0, '2024-01-28', '2023-01-24 00:00:00');


-- Dummy Representative Bucket for development
UPDATE `user`
SET rep_bucket_id =
        CASE
            WHEN id = 1 THEN 1
            WHEN id = 2 THEN 2
            WHEN id = 3 THEN 3
            WHEN id = 4 THEN 4
            END
WHERE id IN (1, 2, 3, 4);


-- Dummy Interest for development
insert into interest (name)
values ('여행'),
       ('휴식'),
       ('인간관계');


-- Dummy Bucket Interest for development
insert into bucket_interest (bucket_id, interest_id)
values (1, 1),
       (1, 3),
       (2, 3),
       (3, 1),
       (3, 2),
       (4, 3),
       (5, 3),
       (5, 2);


-- Dummy Bucket Reaction for development
insert into bucket_reaction (bucket_id, user_id, reaction)
values (1, 1, '멋져요'),
       (2, 2, '응원해요'),
       (3, 3, '멋져요'),
       (4, 4, '응원해요'),
       (6, 5, '멋져요'),
       (3, 1, '나도할래'),
       (5, 4, '나도할래'),
       (1, 2, '나도할래');


-- Dummy Bucket Comment for development
INSERT INTO comment_bucket (user_id, bucket_id, context, created_date, updated_date)
VALUES (1, 1, 'First comment for bucket 1', '2024-01-30 10:00:00', '2024-01-30 10:00:00'),
       (2, 1, 'Second comment for bucket 1', '2024-01-30 10:15:00', '2024-01-30 10:15:00'),
       (2, 2, 'First comment for bucket 2', '2024-01-30 10:30:00', '2024-01-30 10:30:00'),
       (2, 3, 'First comment for bucket 3', '2024-01-30 11:00:00', '2024-01-30 11:00:00'),
       (3, 3, 'Second comment for bucket 3', '2024-01-30 11:15:00', '2024-01-30 11:15:00'),
       (3, 5, 'First comment for bucket 5', '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
       (1, 5, 'Second comment for bucket 5', '2024-01-30 12:15:00', '2024-01-30 12:15:00');


-- Dummy Bucket Comment Like for development
INSERT INTO comment_bucket_like (user_id, comment_id)
VALUES (1, 1),
       (1, 2),
       (5, 6),
       (5, 7);


-- Dummy Review for development
insert into review (title, bucket_id, context, created_date, updated_date)
values ('this is a title.', 1,
        '<h1>Heading1</h1><h2>Heading2</h2><h3>Heading3</h3><p><strong>bold</strong></p><p><em>italic</em></p><p><br></p><p><del>strike</del></p><div contenteditable="false"><hr></div><p>line</p><blockquote><p>quote</p></blockquote><ul><li><p>ul</p></li><li><p>ul2</p></li></ul><ol><li><p>ol</p></li><li><p>ol2</p></li></ol><ul><li class="task-list-item" data-task="true"><p>to do</p></li><li class="task-list-item" data-task="true"><p>to do 2</p></li></ul><table><thead><tr><th><p>c1</p></th><th><p>c2</p></th><th><p>c3</p></th><th><p>c4</p></th></tr></thead><tbody><tr><td><p>this</p></td><td><p>is</p></td><td><p>a</p></td><td><p>table.</p></td></tr></tbody></table><p><img src="/tui-editor/image-print?filename=9237233c01394213a26fcf432f889c99.jpg" alt="image alt attribute" contenteditable="false"><br></p><p><a href="https://www.naver.com/">This is a link to naver.</a></p><p><br></p><p><code data-backticks="1">print(12345)</code></p><div data-language="text" class="toastui-editor-ww-code-block"><pre><code>A, B = map(int, input().split())print(A+B)</code></pre></div>',
        now(), now()),
       ('버킷2의 후기', 2, '후기 내용2', now(), now()),
       ('버킷3의 후기', 3, '후기 내용3', now(), now()),
       ('버킷4의 후기', 4, '후기 내용4', now(), now()),
       ('버킷5의 후기', 5, '후기 내용5', now(), now()),
       ('버킷6의 후기', 6, '후기 내용6', now(), now());


-- Dummy Review Reaction for development
insert into review_reaction (review_id, user_id, reaction)
values (1, 1, '멋져요'),
       (2, 2, '응원해요'),
       (3, 3, '멋져요'),
       (4, 4, '응원해요'),
       (5, 5, '멋져요'),
       (3, 1, '나도할래'),
       (5, 4, '나도할래'),
       (1, 2, '나도할래');


-- Dummy Review Comment for development
INSERT INTO comment_review (user_id, review_id, context, created_date, updated_date)
VALUES (1, 1, 'First comment for review 1', '2024-01-30 10:00:00', '2024-01-30 10:00:00'),
       (2, 1, 'Second comment for review 1', '2024-01-30 10:15:00', '2024-01-30 10:15:00'),
       (2, 2, 'First comment for review 2', '2024-01-30 10:30:00', '2024-01-30 10:30:00'),
       (2, 3, 'First comment for review 3', '2024-01-30 11:00:00', '2024-01-30 11:00:00'),
       (3, 3, 'Second comment for review 3', '2024-01-30 11:15:00', '2024-01-30 11:15:00'),
       (3, 5, 'First comment for review 5', '2024-01-30 12:00:00', '2024-01-30 12:00:00'),
       (1, 5, 'Second comment for review 5', '2024-01-30 12:15:00', '2024-01-30 12:15:00');


-- Dummy Review Comment Like for development
INSERT INTO comment_review_like (user_id, comment_id)
VALUES (1, 1),
       (1, 2),
       (5, 6),
       (5, 7);


-- Dummy Follow for development
INSERT INTO follow (follower_id, followee_id, score)
VALUES (1, 2, 2),
       (1, 6, 6),
       (2, 1, 2),
       (2, 3, 6),
       (3, 2, 6),
       (3, 4, 12),
       (4, 3, 12),
       (4, 5, 20),
       (5, 4, 20),
       (5, 6, 30),
       (6, 1, 6),
       (6, 5, 30);


-- Dummy User Interest for development
INSERT INTO user_interest (interest_id, user_id)
VALUES (1, 1),
       (2, 1),
       (1, 2),
       (3, 2),
       (2, 3),
       (3, 3),
       (1, 4),
       (2, 5),
       (3, 6);