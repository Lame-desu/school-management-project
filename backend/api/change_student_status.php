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
$status = trim($data["status"] ?? "");

if (empty($username) || empty($status)) {
    echo json_encode(["success" => false, "message" => "Username and status are required"]);
    exit;
}

// Update student status in database
$query = "UPDATE students SET status = ? WHERE username = ?";
$stmt = $db->prepare($query);
$stmt->bind_param("ss", $status, $username);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Student status updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update student status"]);
}

$stmt->close();
$db->close();
?>
