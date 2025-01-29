<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once "../config/db.php"; // Import database connection
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
$database = new Database();
$db = $database->getConnection();
// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received
if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$username = trim($data['username']);
$password = trim($data['password']);

// Validate inputs
if (empty($username) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Username and password cannot be empty"]);
    exit;
}

// Check if the username already exists
$stmt = $db->prepare("SELECT id FROM admins WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Username already exists"]);
    exit;
}
$stmt->close();

// Hash the password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Insert new admin into the database
$stmt = $db->prepare("INSERT INTO admins (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Admin registered successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to register admin"]);
}

$stmt->close();
$db->close();
?>

