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
