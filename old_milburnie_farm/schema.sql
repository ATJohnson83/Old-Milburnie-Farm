DROP DATABASE IF EXISTS oldbmillburne;
CREATE database oldbmillburne;

USE oldbmillburne;

CREATE TABLE tasks
(
    id INT NOT NULL,
    
    PRIMARY KEY (id)
);


CREATE TABLE employees
(
    id INT NOT NULL,

    PRIMARY KEY (id)
);


CREATE TABLE manager
(
    id INT NOT NULL,

    PRIMARY KEY (id)
);


