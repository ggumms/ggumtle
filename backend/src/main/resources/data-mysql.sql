-- Dummy User for development
INSERT INTO user (user_nickname, user_profile_image, birth_date, gender, deleted_date, created_date, updated_date)
VALUES ('nickname1', 'profile_image1.jpg', '1990-01-01', 'Male', NULL, NOW(), NOW());

-- Dummy Review for development
insert into review (title, bucket_id, context, created_date, updated_date)
values('this is a title.', null,
       '<h1>Heading1</h1><h2>Heading2</h2><h3>Heading3</h3><p><strong>bold</strong></p><p><em>italic</em></p><p><br></p><p><del>strike</del></p><div contenteditable="false"><hr></div><p>line</p><blockquote><p>quote</p></blockquote><ul><li><p>ul</p></li><li><p>ul2</p></li></ul><ol><li><p>ol</p></li><li><p>ol2</p></li></ol><ul><li class="task-list-item" data-task="true"><p>to do</p></li><li class="task-list-item" data-task="true"><p>to do 2</p></li></ul><table><thead><tr><th><p>c1</p></th><th><p>c2</p></th><th><p>c3</p></th><th><p>c4</p></th></tr></thead><tbody><tr><td><p>this</p></td><td><p>is</p></td><td><p>a</p></td><td><p>table.</p></td></tr></tbody></table><p><img src="/tui-editor/image-print?filename=9237233c01394213a26fcf432f889c99.jpg" alt="image alt attribute" contenteditable="false"><br></p><p><a href="https://www.naver.com/">This is a link to naver.</a></p><p><br></p><p><code data-backticks="1">print(12345)</code></p><div data-language="text" class="toastui-editor-ww-code-block"><pre><code>A, B = map(int, input().split())print(A+B)</code></pre></div>',
       now(), now());