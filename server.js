const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg');
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors());
//Alla inkommande requests som har Content-Type: application/json - läs in innehållet, tolka det som JSON och lägg det som ett objekt i i req.body.
app.use(express.json());

//Anslut till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((err) => {
    if (err) {
        console.log("Det gick inte att ansluta: " + err);
        return;
    }

    console.log("Ansluten till databas");
});

//Routes
app.get("/api", (req, res) => {
    res.json({message: "Välkommen till mitt API"});
});

app.get("/api/workexperience", (req, res) => {
    
    //Hämta workexperience
    client.query(`SELECT * FROM workexperience`, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Något gick fel: " + err });
        }

        //Results.rows innehåller arrayen med rader
        if (results.rows.length === 0) {
            return res.status(200).json([]);  //Tom array om inga rader finns
        } else {
            return res.json(results.rows); //Returnera raderna som JSON
        }
    });
});

app.post("/api/workexperience", (req, res) => {

    //Plocka ut data från JSON-body. Om req.body inte finns (t.ex. vid felaktig request), använd ett tomt objekt som fallback för att undvika crash.
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body || {};

    //Adderar ett mer detaljerat felmeddelande.
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {

        errors.message = "Alla fällt är inte ifyllda."
        errors.detail = "Du måste fylla i alla fällt."
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        return res.status(400).json(errors);
    }

    let workexperience = {
        companyname,
        jobtitle,
        location,
        startdate,
        enddate,
        description
    };

    res.json({ message: "Workexperience adderad", workexperience });
});

app.put("/api/workexperience/:id", (req, res) => {
    res.json({message: "Workexperience uppdaterad: " + req.params.id});
});

app.delete("/api/workexperience/:id", (req, res) => {
    res.json({message: "Workexperience raderad: " + req.params.id});
});


app.listen(port, () => {
    console.log('Server är startad på port: ' + port);
});