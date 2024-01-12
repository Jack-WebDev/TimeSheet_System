-- Create Database
CREATE DATABASE IF NOT EXISTS NDT_Timesheet;

-- Use the Database
USE NDT_Timesheet;

-- Create User Table
CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,  -- Use a secure hashing algorithm
    Role ENUM('Employee', 'Manager', 'Administrator') NOT NULL
);

-- Create Department Table
CREATE TABLE IF NOT EXISTS Departments (
    DepartmentID INT PRIMARY KEY AUTO_INCREMENT,
    DepartmentName VARCHAR(50) NOT NULL
);

-- Create Project Table
CREATE TABLE IF NOT EXISTS Projects (
    ProjectID INT PRIMARY KEY AUTO_INCREMENT,
    ProjectName VARCHAR(50) NOT NULL,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

-- Create Timesheets Table
CREATE TABLE IF NOT EXISTS Timesheets (
    TimesheetID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ProjectID INT,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    HoursWorked DECIMAL(5, 2) NOT NULL,
    Status ENUM('Draft', 'Submitted', 'Approved', 'Rejected') DEFAULT 'Draft',
    SubmissionDate DATETIME,
    ApprovalDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

-- Create TimePeriods Table
CREATE TABLE IF NOT EXISTS TimePeriods (
    TimePeriodID INT PRIMARY KEY AUTO_INCREMENT,
    PeriodType ENUM('Daily', 'Weekly', 'Monthly') NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL
);

-- Create TimesheetTimePeriods Table (to associate timesheets with time periods)
CREATE TABLE IF NOT EXISTS TimesheetTimePeriods (
    TimesheetID INT,
    TimePeriodID INT,
    PRIMARY KEY (TimesheetID, TimePeriodID),
    FOREIGN KEY (TimesheetID) REFERENCES Timesheets(TimesheetID),
    FOREIGN KEY (TimePeriodID) REFERENCES TimePeriods(TimePeriodID)
);

-- Create Reports Table (to store generated reports)
CREATE TABLE IF NOT EXISTS Reports (
    ReportID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    DepartmentID INT,
    ProjectID INT,
    TimePeriodID INT,
    ReportData TEXT,
    GeneratedDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID),
    FOREIGN KEY (TimePeriodID) REFERENCES TimePeriods(TimePeriodID)
);
