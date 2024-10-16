\c employee_directory

-- Insert departments
INSERT INTO department (name)
VALUES ('Sales'),
       ('HR'),
       ('Programming'),
       ('IT'),
       ('Executive');

-- Insert roles
INSERT INTO role (title, salary, department_id)
VALUES ('Account Executive', 100000, 1),
       ('Sr. Account Executive', 150000, 1),
       ('Sales Director', 200000, 1),
       ('HR Coordinator', 75000, 2),
       ('HR Generalist', 85000, 2),
       ('HR Director', 100000, 2),
       ('Jr. Developer', 85000, 3),
       ('Sr. Developer', 125000, 3),
       ('Programming Director', 225000, 3),
       ('IT Project Manager', 85000, 4),
       ('IT Project Director', 100000, 4),
       ('Chief Executive Officer', 300000, 5),
       ('Chief Operating Officer', 275000, 5),
       ('Chief Financial Officer', 275000, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Dottie', 'O''Neil', 12, NULL),  -- Ensure role_id 12 exists
('Becky', 'Houlihan', 13, 1),     -- Ensure role_id 13 exists
('April', 'Romper', 14, 1),       -- Ensure role_id 14 exists
('Dale', 'Robson', 3, 2),         -- Ensure role_id 3 exists
('William', 'Louie', 9, 2),       -- Ensure role_id 9 exists
('Carl', 'Cliffbeard', 11, 2),    -- Ensure role_id 11 exists
('Jackie', 'O''Rourke', 6, 2),    -- Ensure role_id 6 exists
('Bob', 'Johnson', 1, 4),         -- Ensure role_id 1 exists
('Frank', 'Dodson', 1, 4),        -- Ensure role_id 1 exists
('Jim', 'Bobson', 2, 4),          -- Ensure role_id 2 exists
('Frankie', 'Codson', 4, 7),      -- Ensure role_id 4 exists
('Bill', 'Brewer', 5, 7),         -- Ensure role_id 5 exists
('Dom', 'Chewer', 5, 7),          -- Ensure role_id 5 exists
('Mary', 'Bronson', 7, 5),        -- Ensure role_id 7 exists
('Sarah', 'Robbie', 8, 5),        -- Ensure role_id 8 exists
('Jeb', 'Johnnygriff', 10, 6),    -- Ensure role_id 10 exists
('Barton', 'Heathcliffscruff', 10, 6); -- Ensure role_id 10 exists