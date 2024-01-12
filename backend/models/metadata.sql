
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
    DepartmentID INT PRIMARY KEY AUTO_INCREMENT,
    DepartmentName VARCHAR(50) NOT NULL
);

-- Create Project Table
CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY AUTO_INCREMENT,
    ProjectName VARCHAR(50) NOT NULL,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

-- Create Timesheets Table
CREATE TABLE Timesheets (
    TimesheetID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ProjectID INT,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    HoursWorked DECIMAL(5, 2) NOT NULL,
    Status ENUM('Draft', 'Submitted', 'Approved', 'Rejected') DEFAULT 'Draft',
    SubmissionDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

