const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
//Alla inkommande requests som har Content-Type: application/json - läs in innehållet, tolka det som JSON och lägg det som ett objekt i i req.body.
app.use(express.json());

//Routes
app.get("/api", (req, res) => {
    res.json({message: "Välkommen till mitt API"});
});

app.get("/api/workexperience", (req, res) => {
    res.json({message: "Hämta workexperience"});
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