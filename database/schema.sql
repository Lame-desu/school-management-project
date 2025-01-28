-- announcements table
USE school_management;

CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique ID for each announcement
    title VARCHAR(255) NOT NULL,                -- Title of the announcement
    date DATETIME DEFAULT CURRENT_TIMESTAMP,    -- Date and time of the announcement
    summary VARCHAR(255),                       -- Brief summary of the announcement
    description TEXT NOT NULL,                  -- Full description of the announcement
    specificity ENUM('public', 'private') NOT NULL, -- Announcement type (public or private)
    private_scope VARCHAR(50) DEFAULT NULL      -- Specific scope for private announcements (e.g., General, Grade 1, Grade 12)
);

CREATE TABLE grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    grade_name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    grade_id INT NOT NULL,
    FOREIGN KEY (grade_id) REFERENCES grades(id) ON DELETE CASCADE
);
