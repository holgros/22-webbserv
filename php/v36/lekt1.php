 <?php 
 

if(isset($_POST['field1']) && isset($_POST['field2'])) {
    $data = $_POST['field1'] . ';' . $_POST['field2'] . "\n";
    $ret = file_put_contents('tmp/mydata.txt', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
        echo "$ret bytes written to file";
    }
}
else {
   die('no post data to process');
}
echo "<br><a href='lekt1.html'>Back to previous page.</a>";

 ?> 
