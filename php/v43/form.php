<?php // DETTA EXEMPEL ÄR EN EXPANDERAD VERSION AV TIDIGARE EXEMPLET "dbconnect.php". RAD 1-13 ÄR IDENTISKA MED FÖRRA VECKANS EXEMPEL.
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
/* 
LAGT FORMULÄRHANTERING TILL FÖRRA EXEMPLET 
*/
$student_name = $_POST["fname"];
$sql = "SELECT * FROM elever WHERE fornamn='" . $student_name . "'"; // observera WHERE-villkoret
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

// TILLÄGG TILL FÖRRA EXEMPLET
echo "Ditt SQL-kommando: " . $sql;
echo "<br><a href='form.html'>Tillbaka till formuläret</a>";
?>
