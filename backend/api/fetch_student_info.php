<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once "../config/db.php"; // Database connection

// Ensure request is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
$database = new Database();
$db = $database->getConnection();
// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data["username"] ?? "");

if (empty($username)) {
    echo json_encode(["success" => false, "message" => "Username is required"]);
    exit;
}

// Fetch student info from database
$query = "SELECT first_name, last_name, username, grade_id, status FROM students WHERE username = ?";
$stmt = $db->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$student = $result->fetch_assoc();

if (!$student) {
    echo json_encode(["success" => false, "message" => "Student not found"]);
    exit;
}

// Construct student response
$response = [
    "success" => true,
    "student" => [
        "fullname" => $student["first_name"] . " " . $student["last_name"],
        "username" => $student["username"],
        "grade" => $student["grade_id"],
        "status" => $student["status"],
        "profile_picture" => "../landing/assets/event1.jpg"
    ]
];

echo json_encode($response);
$stmt->close();
$db->close();
?>
