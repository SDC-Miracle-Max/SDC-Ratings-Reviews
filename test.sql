CREATE DATABASE vscodetest;

\c vscodetest;

CREATE TABLE testtable (
    id serial primary key,
    firstname text,
    lastname text
);