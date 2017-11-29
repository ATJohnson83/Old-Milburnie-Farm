INSERT INTO Users
    (name, type, username, password, createdAt, UpdatedAt)
VALUES('David', 'Employee', 'David', '1234', '2017-11-25', '2017-11-25'),
('Austin', 'Managment', 'Austin', '1234', '2017-11-25', '2017-11-25'),
('Stanbury', 'Customer', 'Stanbury', '1234', '2017-11-25', '2017-11-25')

INSERT INTO Tasks
    (name, employee, Description, createdAt, UpdatedAt)
VALUES('Chicken Legs', 'David', 'Grab all the chickens by the legs', '2017-11-25', '2017-11-25')

INSERT INTO Sales_Inventory
    (name, type, quantity, unit, price,  createdAt, UpdatedAt)
VALUES('bacon', 'pork', 10, 'lbs', 2.50, '2017-11-25', '2017-11-25' )

INSERT INTO orders
    (open_date, delivered_date,  createdAt, UpdatedAt)
VALUES(2017-11-25, 2017-11-16, '2017-11-25', '2017-11-25')

INSERT INTO Harvest
    (date, name, type, field, bed, quantity, units, createdAt, UpdatedAt)
VALUES(2017-11-25, "hogs", 'pork', '1', '1', '1','lbs', '2017-11-25', '2017-11-25')
    
INSERT INTO Clock
    (clockIn, clockOut, total , createdAt, UpdatedAt)
VALUES("5:55", "6:00", "5", '2017-11-25', '2017-11-25')