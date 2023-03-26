"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFetchDb = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
/*
const stationDb = new sqlite3.Database('bikestations')
const tripDb = new sqlite3.Database('biketrips')
*/
const db = new sqlite3_1.default.Database('sqliteDB');
/** Fetch some lines from each table and print out results */
const testFetchDb = () => {
    db.serialize(() => {
        db.all('SELECT * FROM bikestations;', (err, result) => {
            console.log('Stations: ' + result.length);
        });
        db.all('SELECT * FROM biketrips;', (err, result) => {
            console.log('Trips: ' + result.length);
            console.log(result[1]);
        });
        db.all('SELECT * FROM biketrips WHERE Departure_station_id=501 ORDER BY datetime(Departure) DESC;', (err, result) => {
            console.log(result[0]);
        });
        //bikestations.dbId as bikedbId,bikestations.FID as FID,bikestations.ID as ID, bikestations.Nimi as Nimi, biketrips.dbId as tripdbId, biketrips.Departure_station_name as starting_point, biketrips.Return_station_name as return_point
        db.all('SELECT a.dbId as stationDB, a.Nimi, a.ID, B.dbId as tripDB  FROM bikestations as a LEFT JOIN (SELECT * FROM biketrips ORDER BY datetime(Departure)) as b ON a.ID=b.Departure_station_id GROUP BY a.dbId;', (err, result) => {
            console.log(result[0]);
            console.log(result[1]);
        });
    });
};
exports.testFetchDb = testFetchDb;
(0, exports.testFetchDb)();
