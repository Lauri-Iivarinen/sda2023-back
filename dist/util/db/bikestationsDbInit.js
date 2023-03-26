"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBikestations = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const functions_1 = require("../functions");
const db = new sqlite3_1.default.Database('sqliteDB');
/** Create bikestations table and insert data from csv */
const createBikestations = () => {
    db.serialize(() => {
        const sqlCreate = `CREATE TABLE IF NOT EXISTS bikestations(
            dbId INTEGER PRIMARY KEY AUTOINCREMENT
            ,FID INTEGER
            ,ID INTEGER
            ,Nimi TEXT
            ,Namn TEXT
            ,Name TEXT
            ,Osoite TEXT
            ,Adress TEXT
            ,Kaupunki TEXT
            ,Stad TEXT
            ,Operaattor TEXT
            ,Kapasiteet INTEGER
            ,x REAL
            ,y REAL);`;
        db.run(sqlCreate);
        const data = (0, functions_1.getData)('dist/util/csv/', 'bikestations.csv');
        const rows = data.map(row => (0, functions_1.splitRow)(row));
        rows.pop(); //last row is empty
        console.log(rows.length);
        const sqlInsert = db.prepare('INSERT INTO bikestations (FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);');
        rows.forEach(rowData => {
            sqlInsert.run(rowData);
        });
        //db.run('INSERT INTO bikestations (FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);', rows)
        sqlInsert.finalize();
    });
};
exports.createBikestations = createBikestations;
(0, exports.createBikestations)();
