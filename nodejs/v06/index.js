// koppla upp till databas, https://www.w3schools.com/nodejs/nodejs_mysql.asp
let mysql = require("mysql");   // installera med kommandot "npm install" som vanligt

let con = mysql.createConnection({
    host: "localhost",  // IP-adress till databas-servern
    user: "root",       // standard-användarnamn till XAMPPs databas
    password: "",       // standardlösenord
    database: "webbserverprogrammering" // ÄNDRA TILL NAMN PÅ DIN DATABAS
});

con.connect(function(err) {
    if (err) throw err;  // felhantering
    console.log("Uppkopplad till databas!");
    // skicka query, https://www.w3schools.com/nodejs/nodejs_mysql_select.asp
    con.query("SELECT * FROM elever", function(err, result, fields) {
        if (err) throw err;     // felhantering
        console.log(result);    // skriv ut innehållet i databasen till kommandotolken
        // hantera enstaka objekt och attribut, t.ex.:
        console.log(result[0]); // skriver ut första raden (objektet) i tabellen 
        console.log(result[0].fornamn); // skriver ut attributet "fornamn" (förutsatt att detta finns - ändra om din tabell ser annorlunda ut)
    });
    // stäng uppkopplingen, kan vara önskvärt ifall man inte vill tvångsavsluta programmet i konsolen
    con.end(function(err) {
        if (err) throw err;         // felhantering
        console.log("Stänger uppkopplingen.");
    });
});

// Skriv ut databastabellens innehåll på en webbsida
// Börja med att starta webbservern och definiera en route (som vi gjort flera gånger tidigare)
const express = require("express");
const fs = require("fs");
const app = express();
app.listen(3000);
console.log("Webbservern körs på port 3000.");
app.get("/", function(req, res) {
    // skicka query till databasen - kopiera samma kod som ovan
    con = mysql.createConnection({
        host: "localhost",  // IP-adress till databas-servern
        user: "root",       // standard-användarnamn till XAMPPs databas
        password: "",       // standardlösenord
        database: "webbserverprogrammering" // ÄNDRA TILL NAMN PÅ DIN DATABAS
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Uppkopplad till databas!");
        con.query("SELECT * FROM elever", function(err, result, fields) {
            if (err) throw err;
            
            // istället för att skriva ut till konsolen skriver vi nu ut till webbsidan
            //res.send(result);

            // aningen mer sofistikerad utskrift
            let output = "";
            for (let elev of result) {  // loopa igenom varje rad i databastabellen
                for (let key in elev) { // loopa igenom varje kolumn i raden
                    output += `${key}: ${elev[key]}, `;
                }
                output += "<br>";
            }
            //res.send(output);

            // använd gärna en förformaterad HTML-mall
            fs.readFile("mall.html", "utf-8", function(err, data) {
                if (err) throw err;
                let htmlArray = data.split("***NODE***");   // splitta HTML-koden i tre delar
                let output = htmlArray[0];
                for (let key in result[0]) {
                    output += `<th>${key}</th>`;
                }
                output += htmlArray[1];
                for (let elev of result) {
                    output += "<tr>";
                    for (let key in elev) {
                        output += `<td>${elev[key]}</td>`;
                    }
                    output += "</tr>";
                }
                output += htmlArray[2];
                res.send(output);
            });

        });   
    });
     
});