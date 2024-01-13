
-- Create User Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Role ENUM('Employee', 'Manager', 'Administrator') NOT NULL
);

-- Create Department Table
CREATE TABLE Departments (
    DepartmentName VARCHAR(50) NOT NULL PRIMARY KEY
);

-- Create Project Table
CREATE TABLE Projects (
    ProjectName VARCHAR(50) NOT NULL UNIQUE,
    DepartmentName VARCHAR(50),
    FOREIGN KEY (DepartmentName) REFERENCES Departments(DepartmentName)
);

-- Create Timesheets Table
CREATE TABLE Timesheets (
    TimesheetID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(255),
    ProjectName VARCHAR(50),
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    HoursWorked DECIMAL(5, 2) NOT NULL,
    Status ENUM('Submitted', 'Approved', 'Rejected') DEFAULT 'Submitted',
    SubmissionDate DATETIME,
    FOREIGN KEY (ProjectName) REFERENCES Projects(ProjectName)
);

