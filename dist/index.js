"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    limit: '5mb',
    extended: true
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('App is running on port ' + PORT);
});
const db = new sqlite3_1.default.Database('bikestations');
app.get('/', (req, res) => {
    res.json({ msg: 'ok' });
});
app.get('/bikestations', (req, res) => {
    try {
        db.serialize(() => {
            db.all('SELECT * FROM bikestations;', (err, result) => {
                return res.json(result);
            });
        });
    }
    catch (error) {
        return res.status(200).json({ status: 'error' });
    }
});
app.get('/bikestations/id/:id', (req, res) => {
    const { id } = req.params;
    try {
        db.serialize(() => {
            db.get('SELECT * FROM bikestations WHERE id=?', id, (err, result) => {
                return res.json(result);
            });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ error: error });
    }
});
app.get('/bikestations/kaupunki/:city', (req, res) => {
    let { city } = req.params;
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    console.log(city);
    try {
        db.serialize(() => {
            db.all('SELECT * FROM bikestations WHERE Kaupunki=?', city, (err, result) => {
                return res.json(result);
            });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ error: error });
    }
});
app.get('/bikestations/stad/:city', (req, res) => {
    let { city } = req.params;
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    console.log(city);
    try {
        db.serialize(() => {
            db.all('SELECT * FROM bikestations WHERE Stad=?', city, (err, result) => {
                return res.json(result);
            });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ error: error });
    }
});
app.get('/bikestations/capacity/:count', (req, res) => {
    const { count } = req.params;
    //Validate
    try {
        db.serialize(() => {
            db.all('SELECT * FROM bikestations where Kapasiteet => ?', count);
        });
    }
    catch (error) {
    }
});
