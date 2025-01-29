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
$grade_id = intval($data["grade"] ?? 0);

if ($grade_id === 0) {
    echo json_encode(["success" => false, "message" => "Grade ID is required"]);
    exit;
}

// Fetch subjects for the given grade
$query = "SELECT subject_name FROM subjects WHERE grade_id = ?";
$stmt = $db->prepare($query);
$stmt->bind_param("i", $grade_id);
$stmt->execute();
$result = $stmt->get_result();

$subjects = [];
while ($row = $result->fetch_assoc()) {
    $subjects[] = ["subject" => $row["subject_name"]];
}

// Return response
if (count($subjects) > 0) {
    echo json_encode(["success" => true, "courses" => $subjects]);
} else {
    echo json_encode(["success" => false, "message" => "No subjects found for this grade"]);
}

$stmt->close();
$db->close();
?>
