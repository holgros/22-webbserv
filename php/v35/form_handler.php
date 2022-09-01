<?php
    // läsa från formulär
    if ($_GET) {
        echo "Du skrev '" . $_GET["meddelande"] . "' med GET!";
    }
    if ($_POST) {
        echo "Du skrev '" . $_POST["meddelande"] . "' med POST!";
    }
    echo "<p><a href='simple_form.html'>Tillbaka</a></p>";
?>