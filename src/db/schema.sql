DROP DATABASE IF EXISTS tech_blog_db;
CREATE DATABASE tech_blog_db;

-- Path: homeworks/tech-blog/src/db/seeds.sql
USE tech_blog_db;

-- Path: homeworks/tech-blog/src/db/schema.sql
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL
);

-- Path: homeworks/tech-blog/src/db/schema.sql
DROP TABLE IF EXISTS blogs;
CREATE TABLE blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Path: homeworks/tech-blog/src/db/schema.sql
DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  blog_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (blog_id) REFERENCES blogs(id)
);

-- Path: homeworks/tech-blog/src/db/seeds.sql
INSERT INTO users (username, email, password) VALUES
  ('user1', 'user1@gmail.com', 'password1'),
  ('user2', 'user2@gmail.com', 'password2'),
  ('user3', 'user3@gmail.com', 'password3');

-- Path: homeworks/tech-blog/src/db/seeds.sql
INSERT INTO blogs (title, content, user_id) VALUES
  ('blog1', 'lorem ipsum dolor sit amet consec tetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 1),
  ('blog2', 'lorem ipsum dolor sit amet consec tetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 2),
  ('blog3', 'lorem ipsum dolor sit amet consec tetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 3);

-- Path: homeworks/tech-blog/src/db/seeds.sql
INSERT INTO comments (content, user_id, blog_id) VALUES
  ('comment1', 1, 1),
  ('comment2', 2, 2),
  ('comment3', 3, 3),
  ('comment4', 1, 2),
  ('comment5', 2, 3),
  ('comment6', 3, 1),
  ('comment7', 1, 3),
  ('comment8', 2, 1),
  ('comment9', 3, 2);

