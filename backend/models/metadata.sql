-- Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL);

-- Employees Table
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Timesheets Table
CREATE TABLE Timesheets (
    TimesheetID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeID INT,
    Date DATE NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    TotalHours DECIMAL(5,2) NOT NULL,
    TaskDescription TEXT,
    Status ENUM('Pending', 'Approved', 'Rejected') NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- Managers Table
CREATE TABLE Managers (
    ManagerID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Approvals Table
CREATE TABLE Approvals (
    ApprovalID INT PRIMARY KEY AUTO_INCREMENT,
    TimesheetID INT,
    ManagerID INT,
    ApprovalStatus ENUM('Approved', 'Rejected') NOT NULL,
    Comments TEXT,
    FOREIGN KEY (TimesheetID) REFERENCES Timesheets(TimesheetID),
    FOREIGN KEY (ManagerID) REFERENCES Managers(ManagerID)
);
