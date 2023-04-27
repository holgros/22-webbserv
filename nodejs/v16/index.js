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

app.put('/users/:id', function(req, res) {
    //kod här för att hantera anrop…
    // kolla först att all data som ska finnas finns i request-body
    if (!(req.body && req.body.firstname && req.body.lastname)) {
        // om data saknas i body
        res.send(400);
        return;
    }
    let sql = `UPDATE users 
        SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}'
        WHERE id = ${req.params.id}`;

    con.query(sql, function(err, result, fields) {
    if (err) {
        throw err;
        //kod här för felhantering, skicka felmeddelande osv.
    }
    else {
        // meddela klienten att request har processats OK
        res.send(200);
    }
    });
});
