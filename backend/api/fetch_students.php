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
$grade_id = intval($data["grade"] ?? 0);

if ($grade_id === 0) {
    echo json_encode(["success" => false, "message" => "Grade ID is required"]);
    exit;
}

// Fetch students for the given grade
$query = "SELECT first_name, last_name, username, status FROM students WHERE grade_id = ?";
$stmt = $db->prepare($query);
$stmt->bind_param("i", $grade_id);
$stmt->execute();
$result = $stmt->get_result();

$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = [
        "fullname" => $row["first_name"] . " " . $row["last_name"],
        "username" => $row["username"],
        "status" => $row["status"]
    ];
}

// Return response
if (count($students) > 0) {
    echo json_encode(["success" => true, "students" => $students]);
} else {
    echo json_encode(["success" => false, "message" => "No students found for this grade"]);
}

$stmt->close();
$db->close();
?>
