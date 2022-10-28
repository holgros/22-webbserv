// express är ett externt paket som möjliggör att köra webbserver med JavaScript
const express = require("express"); // importera express (kräver att man först kör "npm install express" i kommandotolken)
const app = express();              // skapa en server
app.get("/", function(req, res) {   // lyssna på GET-anrop på routen "/", dvs. serverns rotadress
   //res.send("Hejsan!");            // skriv ett enkelt textmeddelande till klienten
   res.sendFile(__dirname + "/exempel.html");   // visa en webbsida för klienten
});
app.listen(3000);   // kör servern på porten 3000
console.log("Kör server på localhost:3000");

// För att servern ska kunna hitta filer som bildfiler så måste man serva en publik mapp med statiska resurser
app.use(express.static("publik"));  // gör all filer i mappen "publik" tillgängliga
