<?php
require "../vendor/autoload.php";
require_once "../config/jwt_config.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function verifyJWT($token) {
    try {
        return JWT::decode($token, new Key(JWT_SECRET_KEY, "HS256"));
    } catch (Exception $e) {
        return null;
    }
}

// Get token from headers
$headers = apache_request_headers();
$authHeader = $headers["Authorization"] ?? "";

if (!$authHeader || !preg_match("/Bearer\s(\S+)/", $authHeader, $matches)) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$decoded = verifyJWT($matches[1]);
if (!$decoded) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid token"]);
    exit;
}
?>
