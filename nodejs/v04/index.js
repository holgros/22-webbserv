const express = require("express");
const app = express();
app.listen(3000);
console.log("Servern körs på port 3000.");
app.get("/", function(req, res) {
    res.send("Välkommen till rotsidan!");
});

/* 
FORMULÄRHANTERING
*/

// Serva en statisk webbsida (form.html) som innehåller formulär
app.get("/form", function(req, res) {
    res.sendFile(__dirname + "/form.html");
});

// hit kommer data när get-formuläret skickas
app.get("/get-route", function(req, res) {  // skapa route
    res.write("Tog emot data med GET: ");
    console.log(req);                       // kolla vad som finns i req-objektet
    console.log(req.query);                 // här finns data som vi skickat med formuläret!
    // gör något med formulärdatan och skriv till webbsidan
    let summa = Number(req.query.tal1) + Number(req.query.tal2);
    // smidigast är att använda en s.k. "template literal": https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    let output = `${req.query.tal1}+${req.query.tal2}=${summa}`;    // samma som: let output = req.query.tal1 + "+" + req.query.tal2 + "=" + summa;
    res.write(output);
    res.send();
});

// hit kommer data när post-formuläret skickas
app.use(express.urlencoded({extended: true}));      // behövs för att processa body i req-objektet
app.post("/post-route", function(req, res) {        // skapa route, OBS: post istället för get
    res.write("Tog emot data med POST: ");
    // OBS: för POST använder vi attributet "body", men för GET använder vi attributet "query"
    console.log(req.body);
    // gör samma sak med req.body som vi gjorde ovan med req.query
    let summa = Number(req.body.tal1) + Number(req.body.tal2);
    let output = `${req.body.tal1}+${req.body.tal2}=${summa}`;
    res.write(output);
    res.send();
});