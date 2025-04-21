# Work Experience API

Detta repository innehåller kod för ett REST API byggt med Node.js och Express. API:t är byggt för att hantera arbetserfarenheter: tidigare arbetsplatser, arbetsuppgifter, anställningens längd och beskrivning.

Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk

En liveversion av API:t finns tillgänglig på följande URL:

## Installation, databas

API:t använder en PostgreSQL-databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket: npm install express pg cors dotenv nodemon. Kör installations-skriptet install.js och sedan npm run dev för att köra server.js. Installations-skriptet skapar databastabeller enligt nedanstående:

Tabellen `workexperience`:

| Fält        | Typ           | Constraint     | Beskrivning                                       |
|-------------|----------------|----------------|---------------------------------------------------|
| id          | SERIAL         | PRIMARY KEY    | Ett unikt id för varje post (autoinkrementerande)|
| companyname | VARCHAR(50)    | NOT NULL       | Företagsnamn där arbetet utfördes                |
| jobtitle    | VARCHAR(50)    | NOT NULL       | Arbetsrollens titel eller befattning             |
| location    | VARCHAR(50)    | NOT NULL       | Platsen där arbetet utfördes                     |
| startdate   | DATE           | NOT NULL       | Datum när arbetet började                        |
| enddate     | DATE           | NOT NULL       | Datum när arbetet avslutades                     |
| description | TEXT           | *(valfri)*     | Beskrivning av arbetsuppgifter

## Användning

Nedan finns beskrivet hur man nå APIet på olika vis:

| Metod  | Ändpunkt                      | Beskrivning                                                                 |
|--------|-------------------------------|------------------------------------------------------------------------------|
| GET    | `/api/workexperience`         | Hämtar alla arbetserfarenheter.                                             |
| GET    | `/api/workexperience/:id`     | Hämtar en specifik arbetserfarenhet med angivet ID.                         |
| POST   | `/api/workexperience`         | Lägger till en ny arbetserfarenhet. Kräver att ett JSON-objekt skickas med. |
| PUT    | `/api/workexperience/:id`     | Uppdaterar en existerande arbetserfarenhet med angivet ID. Kräver ett JSON-objekt. |
| DELETE | `/api/workexperience/:id`     | Raderar en arbetserfarenhet med angivet ID. 

Ett kurs-objekt returneras/skickas som JSON med följande struktur:

```json
{
   "companyname": "Mittuniversitetet",
   "jobtitle": "Lärare",
   "location": "Sundsvall",
   "startdate": "2019-01-01",
   "enddate": "2019-12-31",
   "description": "Lärare i kursen DT057G"
}