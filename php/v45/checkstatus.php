<?php
session_start();
if (isset($_SESSION["user"])) {
    echo "<p>Du är inloggad som " . $_SESSION["user"] . "</p>";
}
else {
    echo "<p>Du är inte inloggad!</p>";
}
echo "<p><a href='form.html'>Tillbaka</a></p>";
?>