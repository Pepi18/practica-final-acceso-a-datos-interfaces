-- Active: 1708530992158@@127.0.0.1@3306@userlogin
CREATE DATABASE IF NOT EXISTS userlogin;

CREATE TABLE users (
    id INT auto_increment primary key,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
Create TABLE posts (
    id INT auto_increment primary key,
    titulo VARCHAR(255) NOT NULL,
    texto VARCHAR(255) NOT NULL
);

