"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrips = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const functions_1 = require("../functions");
const db = new sqlite3_1.default.Database('biketrips');
/** Create trips table and insert data from all csv files */
const createTrips = () => {
    db.serialize(() => {
        const sqlCreate = `CREATE TABLE IF NOT EXISTS biketrips(
            dbId INTEGER PRIMARY KEY AUTOINCREMENT
            ,Departure TEXT
            ,Return TEXT
            ,Departure_station_id INTEGER
            ,Departure_station_name TEXT
            ,Return_station_id INTEGER
            ,Return_station_name TEXT
            ,Covered_distance INTEGER
            ,Duration INTEGER);`;
        db.run(sqlCreate);
        const tripData = (0, functions_1.getData)('2021-05.csv');
        const rows = tripData.map(row => (0, functions_1.splitRow)(row));
        rows.pop(); //Last row is empty
        //.csv is so large, for the scope of the exercise it is pointless to use the entire set, to speed up the process only take first 100 000 rows
        const partial = rows.slice(0, 100000);
        const sqlInsert = db.prepare('INSERT INTO biketrips (Departure,Return,Departure_station_id,Departure_station_name,Return_station_id,Return_station_name,Covered_distance,Duration) VALUES (?,?,?,?,?,?,?,?);');
        partial.forEach((rowData, index) => {
            console.log(((index / 100000) * 100).toFixed(1) + '%');
            sqlInsert.run(rowData);
        });
        sqlInsert.finalize();
    });
};
exports.createTrips = createTrips;
(0, exports.createTrips)();
