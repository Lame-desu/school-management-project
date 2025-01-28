<?php
require_once "../config/db.php"; // Database connection
// Set headers for the API response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Check if request is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}
$database = new Database();
$db = $database->getConnection();
// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit;
}

// Extract student details
$first_name = trim($data["first_name"] ?? "");
$last_name = trim($data["last_name"] ?? "");
$username = trim($data["username"] ?? "");
$grade_id = intval($data["grade_id"] ?? 0);
$password = $data["password"] ?? "";

// Validate inputs
if (empty($first_name) || empty($last_name) || empty($username) || empty($grade_id) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

// Check if username already exists
$query = "SELECT id FROM students WHERE username = ?";
$stmt = $db->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Username already exists"]);
    exit;
}
$stmt->close();

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert new student
$query = "INSERT INTO students (first_name, last_name, username, grade_id, password) VALUES (?, ?, ?, ?, ?)";
$stmt = $db->prepare($query);
$stmt->bind_param("sssis", $first_name, $last_name, $username, $grade_id, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registration successful!"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed"]);
}
$stmt->close();
$db->close();
?>
