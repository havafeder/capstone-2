CREATE DATABASE todolist;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
);


CREATE TABLE todo(
	todo_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users ON DELETE CASCADE,
	description varchar(255)
);