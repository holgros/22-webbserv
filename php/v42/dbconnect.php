<?php
// STEG 1: koppla upp sig till databasen - se https://www.w3schools.com/php/php_mysql_connect.asp
$servername = "localhost";              // min server
$username = "root"; // standardinställningar i XAMPP
$password = "";     // standardinställningar i XAMPP
$dbname = "webbserverprogrammering";    // namn på min databas ÄNDRA IFALL DU HAR ANNAT NAMN PÅ DATABAS
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully<br>";

// STEG 2: skicka SQL till databasen - se https://www.w3schools.com/php/php_mysql_select.asp
$sql = "SELECT * FROM elever"; // ÄNDRA IFALL DU HAR ANNAT NAMN PÅ TABELL
$result = $conn->query($sql);
// skriv ut resultatet på webbsidan
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
      // OBS - nycklarna till det associativa fältet måste motsvara kolumnernas namn! ÄNDRA VID BEHOV!
      echo "id: " . $row["id"]. " - Namn: " . $row["fornamn"]. " " . $row["efternamn"]. "<br>";
  }
} else {
    echo "0 results";
}
$conn->close(); // stäng uppkopplingen
?>