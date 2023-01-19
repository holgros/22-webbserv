const express = require("express");
const app = express();
app.listen(3000);
console.log("Servern körs på port 3000.");
app.get("/", function(req, res) {
    res.send("Välkommen till rotsidan!");
});

// filhantering
const fs = require("fs");                                       // importera fs (fileserver)
app.get("/filhantering", function(req, res) {                   // skapa en route
    fs.readFile("data.txt", function(err, data) {               // läsa text från fil
        res.set({"content-type": "text/html; charset=utf8"});   // sätta headers, så att vi kan skriva åäö
        res.write(data);                                        // skriva ut till webbsidan
        res.send();                                             // skicka till klienten
        console.log(err);                                       // null om det inte är några problem/fel
    });
});

// filhantering: en enkel besöksräknare
app.get("/besokare", function(req, res) {                       // skapa route
    fs.readFile("besokare.txt", function(err, data) {           // läs från fil
        let antal = Number(data.toString());                    // gör om till heltal
        antal++;                                                // öka med ett
        antal = antal.toString();                               // gör om till textsträng igen
        fs.writeFile("besokare.txt", antal, function(err) {     // skriver till filen "besokare.txt", det som skrivs är variabeln antal
            console.log(err);                                   // null om det inte är några problem/fel
        });
        res.send(`Denna sida har laddats ${antal} gånger.`);    // skriv till webbsida/klient
    });
});
