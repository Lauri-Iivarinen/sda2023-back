"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFetchDb = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const stationDb = new sqlite3_1.default.Database('bikestations');
const tripDb = new sqlite3_1.default.Database('biketrips');
/** Fetch some lines from each table and print out results */
const testFetchDb = () => {
    stationDb.serialize(() => {
        stationDb.all('SELECT * FROM bikestations;', (err, result) => {
            console.log('Stations: ' + result.length);
        });
    });
    tripDb.serialize(() => {
        tripDb.all('SELECT * FROM biketrips;', (err, result) => {
            console.log('Trips: ' + result.length);
        });
        tripDb.all('SELECT * FROM biketrips WHERE Duration=6969696;', (err, result) => {
            console.log(result);
        });
    });
};
exports.testFetchDb = testFetchDb;
(0, exports.testFetchDb)();
