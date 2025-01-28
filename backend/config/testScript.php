<?php
include 'db.php';

$database = new Database();
$conn = $database->getConnection();

if ($conn) {
    echo "Connected successfully to the database!";
} else {
    echo "Connection failed!";
}
?>


<!-- "C:/xampp/htdocs/website/school-management-website/backend/config/testScript.php" -->