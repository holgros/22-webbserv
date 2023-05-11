let express = require("express");
let app = express();
app.listen(3000);
console.log("Servern körs på port 3000");

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/dokumentation.html");
});

const mysql = require("mysql");
con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webbserverprogrammering",
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

const jwt = require("jsonwebtoken");    // installera med "npm install jsonwebtoken"
app.post("/login", function(req, res) {
    console.log(req.body);
    let sql = `SELECT * FROM users WHERE userId='${req.body.userId}'`

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        let passwordHash = hash(req.body.passwd);
        if (result[0].passwd == passwordHash) {
            //Denna kod skapar en token att returnera till anroparen.
            let payload = {
                sub: result[0].userId,      //sub är obligatorisk
                name: result[0].firstname,   //Valbar information om användaren
                lastname: result[0].lastname
            }
            let token = jwt.sign(payload, "EnHemlighetSomIngenKanGissaXyz123%&/");
            res.json(token);
        }
        else {
            res.sendStatus(401);
        }
    });
});

app.get("/users", function(req, res) {
    let authHeader = req.headers['authorization']
    if (authHeader === undefined) {
        // skicka lämplig HTTP-status om auth-header saknas, en “400 någonting”
        res.sendStatus(400);    // "Bad request"
        return;
    }
    let token = authHeader.slice(7) // tar bort "BEARER " från headern.
    // nu finns den inskickade token i variabeln token
    console.log(token);
    
    // avkoda token
    let decoded;
    try {
        decoded = jwt.verify(token, "EnHemlighetSomIngenKanGissaXyz123%&/")
    } catch (err) {
        console.log(err) //Logga felet, för felsökning på servern.
        res.status(401).send("Invalid auth token");
        return;
    }
    
    //Här kan man göra något bra med den info som finns i decoded...
    console.log(decoded);
    console.log("Tjena " + decoded.name + " " + decoded.lastname);
    // ... men just nu nöjer vi oss bara att läsa från databasen.
    let sql = "SELECT * FROM users";    // ÄNDRA TILL NAMN PÅ ER EGEN TABELL (om den heter något annat än "users")
    console.log(sql);
    // skicka query till databasen
    con.query(sql, function(err, result, fields) {
        res.send(result);
    });
    
});