<?php 
 //header('Content-type: text/plain');
 $myfile = fopen("textfile.txt", "r") or die("Unable to open file!");
 if(flock($myfile,LOCK_EX)) // funktionen "flock" ser till att endast en bes�kare i taget kan �ppna filen
 {
     $number = (int)fgets($myfile);
     $number++;
     $myfile = fopen("textfile.txt", "w") or die("Unable to open file!");
     fwrite($myfile, $number);
     echo("Denna sida har laddats $number gånger.");
 }
 else
 {
     echo("Fel vid filhantering.");
 }
 fclose($myfile);
 ?> 