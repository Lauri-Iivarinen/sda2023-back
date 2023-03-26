import express from "express";
import sqlite3 from "sqlite3";

const app = express()
app.use(express.json());
app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('App is running on port ' + PORT)
});

const db = new sqlite3.Database('sqliteDB')

app.get('/', (req, res) => {
    res.json({msg: 'ok'})
})

app.get('/bikestations', (req, res) => {
    try {
        db.serialize(() => {
            db.all('SELECT * FROM bikestations;', (err, result) => {
                return res.json(result)
            })
        })
    } catch (error) {
        return res.status(200).json({status: 'error'})
    }
})

app.get('/bikestations/trips', (req, res) => {

    const sql = `SELECT a.FID
    ,a.ID
    ,a.Nimi
    ,a.Namn
    ,a.Name
    ,a.Osoite
    ,a.Adress
    ,a.Kaupunki
    ,a.Stad
    ,a.Operaattor
    ,a.Kapasiteet
    ,a.x
    ,a.y
    ,b.Departure
    ,b.Return
    ,b.Departure_station_id
    ,b.Departure_station_name
    ,b.Return_station_id
    ,b.Return_station_name
    ,b.Covered_distance
    ,b.Duration
    FROM bikestations as a
    LEFT JOIN (SELECT * FROM biketrips ORDER BY datetime(Departure)) as b
    ON a.ID=b.Departure_station_id
    GROUP BY a.dbId;`

    try {
        db.serialize(() => {
            db.all(sql, (err, result) => {
                return res.json(result)
            })
        })
    } catch (error) {
        return res.status(200).json({status: 'error'})
    }
})

app.get('/bikestations/id/:id', (req, res) => {
    const { id } = req.params
    try {
        db.serialize(() => {
            db.get('SELECT FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y FROM bikestations WHERE ID=?;', id, (err, result) => {
                return res.json(result)
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ error: error })
    }
})

app.get('/bikestations/city/:city', (req, res) => {
    let { city } = req.params
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    try {
        db.serialize(() => {
            db.all('SELECT FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y FROM bikestations WHERE Kaupunki=? OR Stad=?;', [city, city], (err, result) => {
                return res.json(result)
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ error: error })
    }
})

app.get('/bikestations/stad/:city', (req, res) => {
    let { city } = req.params
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    console.log(city)
    try {
        db.serialize(() => {
            db.all('SELECT FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y FROM bikestations WHERE Stad=?;', city, (err, result) => {
                return res.json(result)
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ error: error })
    }
})

app.get('/bikestations/kapasiteet/:count', (req, res) => {
    const { count } = req.params
    //Validate
    try {
        db.serialize(() => {
            db.all('SELECT FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y FROM bikestations WHERE Kapasiteet>=?;', count, (err, result) => {
                return res.json(result)
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ error: error })
    }
})

app.get('/bikestations/name/:name', (req, res) => {
    const { name } = req.params

    try {
        db.all("SELECT * FROM bikestations WHERE Nimi LIKE '%'|| ? ||'%' OR Namn LIKE '%'|| ? ||'%' OR Name LIKE '%'|| ? ||'%';", [name,name,name], (err, result) => {
            //console.log(result)
            return res.json(result)
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ error: error })
    }
})