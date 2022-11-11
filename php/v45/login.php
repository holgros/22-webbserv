<?php
session_start();
$_SESSION["user"] = $_POST["user"];
echo "<p>Sessionsvariabel tilldelad!</p>";
echo "<p><a href='checkstatus.php'>Kolla status</a></p>";
echo "<p><a href='logout.php'>Logga ut</a></p>";
?>