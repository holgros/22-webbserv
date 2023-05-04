let express = require("express");  // INSTALLERA MED "npm install express" I KOMMANDOTOLKEN
let app = express();
app.listen(3000);
console.log("Servern körs på port 3000");

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/dokumentation.html");
});

const mysql = require("mysql"); // INSTALLERA MED "npm install mysql" I KOMMANDOTOLKEN
con = mysql.createConnection({
    host: "localhost",      // databas-serverns IP-adress
    user: "root",           // standardanvändarnamn för XAMPP
    password: "",           // standardlösenord för XAMPP
    database: "webbserverprogrammering", // ÄNDRA TILL NAMN PÅ ER EGEN DATABAS
    multipleStatements: true    // OBS: måste tillåta att vi kör flera sql-anrop i samma query
});

app.use(express.json());

/*
 Funktion som tar någon form av indata, t.ex. ett lösenord i klartext,
 hashar det och returnerar hashvärdet som en sträng.
*/
const crypto = require("crypto"); //INSTALLERA MED "npm install crypto" I KOMMANDOTOLKEN
function hash(data) {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    return hash.digest("hex");
}

// demonstrera funktonen
console.log("'Apelsin' -> " + hash("Apelsin"));
console.log("'Banan' -> " + hash("Banan"));

// samma som i exemplet från API vecka 3 (hantera POST och skriva till databas), men med hashat lösenord
app.post("/users", function(req, res) {
    if (!req.body.userId) {
        res.status(400).send("userId required!");
        return;
    }
    let fields = ["firstname", "lastname", "userId", "passwd"];  // ändra eventuellt till namn på er egen databastabells kolumner
    for (let key in req.body) {
        if (!fields.includes(key)) {
            res.status(400).send("Unknown field: " + key);
            return;
        }
    }
    // OBS: näst sista raden i SQL-satsen står det hash(req.body.passwd) istället för req.body.passwd
    // Det hashade lösenordet kan ha över 50 tecken, så använd t.ex. typen VARCHAR(100) i databasen, annars riskerar det hashade lösenordet att trunkeras (klippas av i slutet)
    let sql = `INSERT INTO users (firstname, lastname, userId, passwd)
    VALUES ('${req.body.firstname}', 
    '${req.body.lastname}',
    '${req.body.userId}',
    '${hash(req.body.passwd)}');
    SELECT LAST_INSERT_ID();`;
    console.log(sql);
    
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        let output = {
            id: result[0].insertId,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            userId: req.body.userId
        }   // OBS: bäst att INTE returnera lösenordet
        res.send(output);
    });
});

app.post("/login", function(req, res) {
    //kod här för att hantera anrop…
    let sql = `SELECT * FROM users WHERE userId='${req.body.userId}'`

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            res.sendStatus(401);
            return;
        }
        let passwordHash = hash(req.body.passwd);
        console.log(passwordHash);
        console.log(result[0].passwd);
        if (result[0].passwd == passwordHash) {
            res.send({  // OBS: returnera inte passwd!
                firstname: result[0].firstname, 
                lastname: result[0].lastname,
                userId: result[0].userId
            });
        }
        else {
            res.sendStatus(401);
        }
    });
});
   