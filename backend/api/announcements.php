<?php
// Include database configuration
require_once '../config/db.php';

// Set headers for the API response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Connect to the database
$database = new Database();
$db = $database->getConnection();

// Handle GET and POST requests
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "GET") {
    // Fetch all announcements
    $query = "SELECT * FROM announcements";
    $result = $db->query($query);

    if ($result->num_rows > 0) {
        $announcements = [];
        while ($row = $result->fetch_assoc()) {
            $announcements[] = $row;
        }
        echo json_encode($announcements);
    } else {
        echo json_encode([]);
    }
} elseif ($requestMethod === "POST") {
    // Get data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    if (!empty($data['title']) && !empty($data['summary']) && !empty($data['description']) && !empty($data['specificity'])) {
        // Prepare the SQL statement
        $stmt = $db->prepare("INSERT INTO announcements (title, summary, description, specificity, private_scope) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param(
            "sssss",
            $data['title'],
            $data['summary'],
            $data['description'],
            $data['specificity'],
            $data['private_scope']
        );

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(["message" => "Announcement added successfully"]);
        } else {
            echo json_encode(["message" => "Failed to add announcement"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["message" => "Invalid input"]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Method not allowed"]);
}

$db->close();
?>
