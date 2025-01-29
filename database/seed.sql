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





INSERT INTO students (first_name, last_name, username, grade_id, password, status) VALUES
-- Grade 9 (10 students)
('Abel', 'Tesfaye', 'abel_t', 9, 'hashed_password1', 'registered'),
('Liya', 'Kebede', 'liya_k', 9, 'hashed_password2', 'registered'),
('Meles', 'Zenawi', 'meles_z', 9, 'hashed_password3', 'pending'),
('Hana', 'Gebreselassie', 'hana_g', 9, 'hashed_password4', 'registered'),
('Kenean', 'Bekele', 'kenean_b', 9, 'hashed_password5', 'pending'),
('Tewodros', 'Alemu', 'tewodros_a', 9, 'hashed_password6', 'registered'),
('Sara', 'Tesfaye', 'sara_t', 9, 'hashed_password7', 'pending'),
('Yohannes', 'Mengistu', 'yohannes_m', 9, 'hashed_password8', 'registered'),
('Mihret', 'Hailemariam', 'mihret_h', 9, 'hashed_password9', 'pending'),
('Samuel', 'Demissie', 'samuel_d', 9, 'hashed_password10', 'registered'),

-- Grade 6 (7 students)
('Eshetu', 'Kassa', 'eshetu_k', 6, 'hashed_password11', 'registered'),
('Sisay', 'Bekele', 'sisay_b', 6, 'hashed_password12', 'pending'),
('Hewan', 'Solomon', 'hewan_s', 6, 'hashed_password13', 'registered'),
('Melat', 'Yohannes', 'melat_y', 6, 'hashed_password14', 'pending'),
('Dawit', 'Hailemichael', 'dawit_h', 6, 'hashed_password15', 'registered'),
('Rahel', 'Mesfin', 'rahel_m', 6, 'hashed_password16', 'pending'),
('Eyob', 'Demelash', 'eyob_d', 6, 'hashed_password17', 'registered'),

-- Grade 12 (6 students)
('Natnael', 'Yimer', 'natnael_y', 12, 'hashed_password18', 'pending'),
('Eden', 'Gizaw', 'eden_g', 12, 'hashed_password19', 'registered'),
('Henok', 'Teferi', 'henok_t', 12, 'hashed_password20', 'registered'),
('Bethel', 'Mulugeta', 'bethel_m', 12, 'hashed_password21', 'pending'),
('Biniyam', 'Abera', 'biniyam_a', 12, 'hashed_password22', 'registered'),
('Rediet', 'Assefa', 'rediet_a', 12, 'hashed_password23', 'pending'),

-- Grade 7 (5 students)
('Lidya', 'Abate', 'lidya_a', 7, 'hashed_password24', 'pending'),
('Yared', 'Gizachew', 'yared_g', 7, 'hashed_password25', 'registered'),
('Tinsae', 'Worku', 'tinsae_w', 7, 'hashed_password26', 'pending'),
('Eyob', 'Demelash', 'eyob_d2', 7, 'hashed_password27', 'registered'),
('Rahel', 'Mesfin', 'rahel_m2', 7, 'hashed_password28', 'pending');


INSERT INTO announcements (title, summary, description, specificity, private_scope) VALUES
-- Announcements for Grade 12
('Grade 12 Project Submission', 'Submit your projects by the deadline.', 
 'Grade 12 students must submit their final projects by November 25, 2025. Late submissions will not be accepted.', 
 'private', 'Grade 12'),
('University Orientation Session', 'Preparation session for university applications.', 
 'A university orientation session for Grade 12 students will take place on December 15, 2025, at the assembly hall.', 
 'private', 'Grade 12'),
('Scholarship Application Deadline', 'Submit scholarship applications by the due date.', 
 'The deadline for submitting scholarship applications is December 20, 2025. Contact the admin office for assistance.', 
 'private', 'Grade 12'),

-- Announcements for General
('Library Renovation Update', 'Renovation extended for two weeks.', 
 'Due to unforeseen delays, the library renovation will continue until November 30, 2025. We apologize for any inconvenience.', 
 'private', 'General'),
('Annual Clean-Up Day', 'Volunteers needed for campus cleaning.', 
 'Join us for the Annual Clean-Up Day on November 20, 2025. All students and staff are encouraged to participate.', 
 'private', 'General'),
('Lost and Found Notice', 'Check the lost and found for your items.', 
 'Students are advised to check the lost and found section in the admin office for any misplaced items.', 
 'private', 'General'),
('School Survey', 'Feedback survey for students and parents.', 
 'The school is conducting a feedback survey to improve services. Links to the survey will be sent via email.', 
 'private', 'General'),

-- Announcements for Grade 9
('Grade 9 Science Fair', 'Participation is mandatory for all Grade 9 students.', 
 'The annual science fair for Grade 9 students will be held on December 1, 2025. Prepare your projects accordingly.', 
 'private', 'Grade 9'),
('Grade 9 Parent Meeting', 'Meeting for parents of Grade 9 students.', 
 'A meeting for the parents of Grade 9 students will be held on November 18, 2025, to discuss academic progress.', 
 'private', 'Grade 9'),

-- Public Announcements
('New Cafeteria Menu', 'Cafeteria menu updated for the term.', 
 'The school cafeteria menu has been updated with new items. Check the notice board for details.', 
 'public', NULL),
('Vaccination Drive', 'Free vaccinations for all students.', 
 'A free vaccination drive will be conducted on campus on November 10, 2025. All students are encouraged to participate.', 
 'public', NULL),
('School Uniform Reminder', 'Ensure you are wearing proper uniforms.', 
 'Students are reminded to wear the proper school uniform every day. Inspections will be conducted.', 
 'public', NULL),
('Holiday Notice', 'School will be closed for a public holiday.', 
 'The school will remain closed on December 25, 2025, for the Christmas holiday. Regular classes resume on December 26.', 
 'public', NULL),

-- Announcements for Grade 7
('Grade 7 Art Competition', 'Showcase your artistic talents.', 
 'Grade 7 students are invited to participate in the art competition on November 14, 2025. Prizes will be awarded.', 
 'private', 'Grade 7'),
('Grade 7 History Field Trip', 'Visit to the National Archives.', 
 'Grade 7 students will visit the National Archives on December 8, 2025. Parent permission forms are required.', 
 'private', 'Grade 7'),
('Grade 7 Study Guide', 'Resources for midterm exams.', 
 'Study guides for the Grade 7 midterm exams are now available. Collect them from your class teacher.', 
 'private', 'Grade 7'),
('Grade 7 Parent-Teacher Conference', 'Meeting to discuss student performance.', 
 'A parent-teacher conference for Grade 7 will be held on November 22, 2025, in the school auditorium.', 
 'private', 'Grade 7');
