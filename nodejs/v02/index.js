let express = require("express");   // importera express
let app = express();    // skapa ett express server-objekt
let port = 3000;        // ... som körs på port 3000

let httpServer = app.listen(port, function() {  // kör webbservern
    console.log(`Webbserver körs på port ${port}`);
});

app.get("/", function(req, res) {   // en "route" till rotsidan
    console.log("En klient anslöt!");   // skriv till serverns konsol
    res.sendFile(__dirname + "/index.html");    // läs in html-fil
});

app.get("/undersida", function(req, res) {  // route till undersida
    res.sendFile(__dirname + "/annanfil.html"); // läs in html-fil
});

app.use(express.static("filer"));   // serva filer i mappen "filer"