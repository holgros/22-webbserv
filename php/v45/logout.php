<?php
session_start();
session_destroy();
// eller unset($_SESSION["user"]); ifall man endast vill ta bort en enstaka sessionsvariabel
echo "<p>Du är utloggad!</p>";
echo "<a href='form.html'>Tillbaka</a>";
?>