<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once "jwt_config.php";
require "../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Get Authorization header
$headers = apache_request_headers();
$authHeader = $headers["Authorization"] ?? "";

if (!$authHeader || !preg_match("/Bearer\s(\S+)/", $authHeader, $matches)) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$token = $matches[1];

try {
    $decoded = JWT::decode($token, new Key(JWT_SECRET_KEY, "HS256"));
    echo json_encode(["success" => true, "message" => "Token is valid", "user" => $decoded]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid or expired token"]);
    exit;
}
?>
