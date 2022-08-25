<?php
    $color = "red";
    echo "My car is " . $color . "<br>";
    echo "My house is " . $color . "<br>";
    echo "My boat is " . $color . "<br>";

    $x = 1;
    if ($x == 1) {
        echo "<h1>x är lika med 1</h1>";
    }

    $age = array("Peter" => 35, "Ben" => 37, "Joe" => 43);
    echo "Peter är " . $age["Peter"] . " år gammal.<br>";

    echo "Skriver ut som en loop:<br>";
    foreach($age as $x => $x_value) {
        echo $x . " är " . $age[$x] . " år gammal.<br>";
    }

?>