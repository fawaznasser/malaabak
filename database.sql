-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS malaabak;

-- Use the database
USE malaabak;

-- Create the Players table
CREATE TABLE IF NOT EXISTS Players (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(50) UNIQUE,
    Password VARCHAR(255), -- Ensure password is hashed, not stored as plain text
    Bio VARCHAR(500),
    PreferredSports VARCHAR(100),
    Age INT,
    Sex VARCHAR(10)
);

-- Create the Friendships table
CREATE TABLE IF NOT EXISTS Friendships (
    FriendshipID INT AUTO_INCREMENT PRIMARY KEY,
    Status VARCHAR(50),
    UserID1 INT,
    UserID2 INT,
    FOREIGN KEY (UserID1) REFERENCES Players(UserID),
    FOREIGN KEY (UserID2) REFERENCES Players(UserID)
);

-- Create the Teams table
CREATE TABLE IF NOT EXISTS Teams (
    TeamID INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(50)
);

-- Create the TeamMembers table
CREATE TABLE IF NOT EXISTS TeamMembers (
    TeamID INT,
    PlayerID INT,
    Position VARCHAR(50),
    PRIMARY KEY (TeamID, PlayerID),
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID),
    FOREIGN KEY (PlayerID) REFERENCES Players(UserID)
);

-- Create the Matches table
CREATE TABLE IF NOT EXISTS Matches (
    MatchID INT AUTO_INCREMENT PRIMARY KEY,
    Team1ID INT,
    Team2ID INT,
    StartTime DATETIME,
    EndTime DATETIME,
    TeamID1Score INT DEFAULT NULL,
    TeamID2Score INT DEFAULT NULL,
    FOREIGN KEY (Team1ID) REFERENCES Teams(TeamID),
    FOREIGN KEY (Team2ID) REFERENCES Teams(TeamID)
);

-- Create the Tournaments table
CREATE TABLE IF NOT EXISTS Tournaments (
    TournamentID INT AUTO_INCREMENT PRIMARY KEY,
    HostID INT,
    StartTime DATETIME,
    EndTime DATETIME,
    Prize VARCHAR(50),
    FOREIGN KEY (HostID) REFERENCES Players(UserID)
);

-- Create the TournamentParticipants table
CREATE TABLE IF NOT EXISTS TournamentParticipants (
    TournamentID INT,
    PlayerID INT,
    PRIMARY KEY (TournamentID, PlayerID),
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID),
    FOREIGN KEY (PlayerID) REFERENCES Players(UserID)
);

-- Create the TournamentMatches table
CREATE TABLE IF NOT EXISTS TournamentMatches (
    TournamentID INT,
    MatchID INT,
    PRIMARY KEY (TournamentID, MatchID),
    FOREIGN KEY (TournamentID) REFERENCES Tournaments(TournamentID),
    FOREIGN KEY (MatchID) REFERENCES Matches(MatchID)
);

-- Create the Courts table
CREATE TABLE IF NOT EXISTS Courts (
    CourtID INT AUTO_INCREMENT PRIMARY KEY,
    Location VARCHAR(100),
    Rating DECIMAL(3,2),
    Size INT,
    Type VARCHAR(50),
    NumberOfPlayers INT,
    Pictures VARCHAR(255) -- Assuming storing image URLs or file paths
);

-- Create the Bookings table
CREATE TABLE IF NOT EXISTS Bookings (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,
    CourtID INT,
    StartTime DATETIME,
    EndTime DATETIME,
    Price DECIMAL(10,2),
    BookingStatus VARCHAR(50),
    FOREIGN KEY (CourtID) REFERENCES Courts(CourtID)
);

-- Create the Receipts table
CREATE TABLE IF NOT EXISTS Receipts (
    ReceiptID INT AUTO_INCREMENT PRIMARY KEY,
    PaymentID INT, -- This should reference a 'Payments' table, if one exists
    Amount DECIMAL(10,2),
    PayerID INT,
    OwnerID INT,
    FOREIGN KEY (PayerID) REFERENCES Players(UserID),
    FOREIGN KEY (OwnerID) REFERENCES Players(UserID)
);
