DROP DATABASE IF EXISTS employee_directory;
CREATE DATABASE employee_directory;

-- Drop tables in the correct order
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
 id serial primary key,
 name varchar(30) unique not null
);

CREATE TABLE role (
 id serial primary key,
 title varchar(30) unique not null,
 salary decimal not null,
 department_id int not null,
 foreign key (department_id) references department(id) on delete cascade
);

CREATE TABLE employee (
 id serial primary key,
 first_name varchar(30) not null,
 last_name varchar(30) not null,
 role_id int not null,
 foreign key (role_id) references role(id) on delete cascade,
 manager_id int,
 foreign key (manager_id) references employee(id) on delete set null
);