<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once "../config/db.php"; // Database connection
require_once "../config/jwt_config.php"; // JWT secret key
require "../vendor/autoload.php"; // Load JWT library

use Firebase\JWT\JWT;

// Ensure POST request
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
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit;
}

// Extract login details
$username = trim($data["username"] ?? "");
$password = $data["password"] ?? "";
$role = trim($data["role"] ?? "");

// Validate inputs
if (empty($username) || empty($password) || empty($role)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

// Determine user role and table
if ($role === "student") {
    $query = "SELECT id, username, password, grade_id, status FROM students WHERE username = ?";
} elseif ($role === "admin") {
    $query = "SELECT id, username, password FROM admins WHERE username = ?";
} else {
    echo json_encode(["success" => false, "message" => "Invalid role"]);
    exit;
}

$stmt = $db->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || !password_verify($password, $user["password"])) {
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
    exit;
}

// Generate JWT Token
$payload = [
    "user_id" => $user["id"],
    "username" => $user["username"],
    "role" => $role,
    "exp" => time() + 3600 // Token expires in 1 hour
];
$token = JWT::encode($payload, JWT_SECRET_KEY, "HS256");

// Determine redirect path
$redirect = ($role === "admin") ? "../admin/dashboard.html" : "../students/home.html";

echo json_encode([
    "success" => true,
    "message" => "Login successful!",
    "token" => $token,
    "redirect" => $redirect,
    "user" => ["username" => $user["username"], "grade_id" => $user["grade_id"] ?? null, "status" => $user["status"] ?? null]
]);

$stmt->close();
$db->close();
?>
