-- announcements data
INSERT INTO announcements (title, summary, description, specificity, private_scope)
VALUES 
('School Reopening', 'Classes will resume on Monday', 'Dear students and parents, classes will resume on Monday, January 30th. Please ensure to arrive on time.', 'public', NULL),
('Grade 9 Exam Schedule', 'Exam schedule for Grade 9', 'The Grade 9 midterm exams will begin on February 10th. Please check your respective subjects for timings.', 'private', 'Grade 9'),
('Sports Day', 'Annual Sports Day event', 'Our Annual Sports Day event is scheduled for February 20th. All grades are encouraged to participate.', 'private', 'General'),
('Holiday Announcement', 'School closed on Feb 14th', 'The school will remain closed on February 14th due to maintenance work.', 'public', NULL);


INSERT INTO grades (grade_name) VALUES
('Grade 1'), ('Grade 2'), ('Grade 3'), ('Grade 4'), ('Grade 5'), ('Grade 6'),
('Grade 7'), ('Grade 8'),
('Grade 9'), ('Grade 10'), ('Grade 11'), ('Grade 12');

INSERT INTO subjects (subject_name, grade_id) VALUES
('Mathematics', 1), ('English', 1), ('Science', 1), ('Social Studies', 1), ('Physical Education', 1), ('Music', 1), ('Art', 1), ('Ethics', 1),
('Mathematics', 2), ('English', 2), ('Science', 2), ('Social Studies', 2), ('Physical Education', 2), ('Music', 2), ('Art', 2), ('Ethics', 2),
('Mathematics', 3), ('English', 3), ('Science', 3), ('Social Studies', 3), ('Physical Education', 3), ('Music', 3), ('Art', 3), ('Ethics', 3),
('Mathematics', 4), ('English', 4), ('Science', 4), ('Social Studies', 4), ('Physical Education', 4), ('Music', 4), ('Art', 4), ('Ethics', 4),
('Mathematics', 5), ('English', 5), ('Science', 5), ('Social Studies', 5), ('Physical Education', 5), ('Music', 5), ('Art', 5), ('Ethics', 5),
('Mathematics', 6), ('English', 6), ('Science', 6), ('Social Studies', 6), ('Physical Education', 6), ('Music', 6), ('Art', 6), ('Ethics', 6);


INSERT INTO subjects (subject_name, grade_id) VALUES
('Mathematics', 7), ('English', 7), ('Physics', 7), ('Chemistry', 7), ('Biology', 7), ('Social Studies', 7), ('ICT', 7), ('Physical Education', 7), ('Music', 7), ('Art', 7),
('Mathematics', 8), ('English', 8), ('Physics', 8), ('Chemistry', 8), ('Biology', 8), ('Social Studies', 8), ('ICT', 8), ('Physical Education', 8), ('Music', 8), ('Art', 8);


INSERT INTO subjects (subject_name, grade_id) VALUES
('Mathematics', 9), ('English', 9), ('Physics', 9), ('Chemistry', 9), ('Biology', 9), ('History', 9), ('Geography', 9), ('Economics', 9), ('ICT', 9), ('Physical Education', 9), ('Music', 9), ('Art', 9),
('Mathematics', 10), ('English', 10), ('Physics', 10), ('Chemistry', 10), ('Biology', 10), ('History', 10), ('Geography', 10), ('Economics', 10), ('ICT', 10), ('Physical Education', 10), ('Music', 10), ('Art', 10),
('Mathematics', 11), ('English', 11), ('Physics', 11), ('Chemistry', 11), ('Biology', 11), ('History', 11), ('Geography', 11), ('Economics', 11), ('ICT', 11), ('Physical Education', 11), ('Music', 11), ('Art', 11),
('Mathematics', 12), ('English', 12), ('Physics', 12), ('Chemistry', 12), ('Biology', 12), ('History', 12), ('Geography', 12), ('Economics', 12), ('ICT', 12), ('Physical Education', 12), ('Music', 12), ('Art', 12);


