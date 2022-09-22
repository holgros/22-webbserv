<!DOCTYPE html>
<html>
<body>

<p>Ladda upp en fil (måste vara en bildfil)!</p>
<form action="upload.php" method="post" enctype="multipart/form-data">
  Select image to upload:
  <input type="file" name="fileToUpload" id="fileToUpload">
  <?php
    session_start();
    // TODO: Kolla att användarnamn och lösenord är OK, t.ex. genom att jämföra med en lista över användare som är sparade i en textfil!
    $_SESSION["user"] = $_POST["uname"];  // För enkelhetens skull hoppar vi över lösenordskontroll i detta exempel
    echo '<input type="submit" value="Upload Image" name="submit">';
  ?>
</form>

</body>
</html>