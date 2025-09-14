CREATE TABLE student_data(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	enrollment VARCHAR(50) NOT NULL UNIQUE,
	section VARCHAR(5) NOT NULL,
	year INTEGER NOT NULL,
	email VARCHAR(60) NOT NULL UNIQUE
);
CREATE TABLE face_data(
	id SERIAL PRIMARY KEY,
	student_id VARCHAR(60) REFERENCES student_data(enrollment),
	face_embedding FLOAT8[] NOT NULL
);