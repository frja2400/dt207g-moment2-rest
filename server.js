const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

//Routes
app.get("/api", (req, res) => {
    res.json({message: "Welcome to my API"});
});

app.get("/api/workexperience", (req, res) => {
    res.json({message: "Get workexperience"});
});

app.post("/api/workexperience", (req, res) => {
    res.json({message: "Workexperience added"});
});

app.put("/api/workexperience/:id", (req, res) => {
    res.json({message: "Workexperience updated: " + req.params.id});
});

app.delete("/api/workexperience/:id", (req, res) => {
    res.json({message: "Workexperience deleted: " + req.params.id});
});


app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});