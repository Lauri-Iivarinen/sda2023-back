import sqlite3 from "sqlite3";
import { Bikestation, Trip } from "../../types/dbTypes";

const stationDb = new sqlite3.Database('bikestations')
const tripDb = new sqlite3.Database('biketrips')

/** Fetch some lines from each table and print out results */
export const testFetchDb = () => {
    stationDb.serialize(() => {
        stationDb.all('SELECT * FROM bikestations;', (err, result: Bikestation[]) => {
            console.log('Stations: ' + result.length)
        })
    })

    tripDb.serialize(() => {
        tripDb.all('SELECT * FROM biketrips;', (err, result) => {
            console.log('Trips: ' + result.length)
        })

        tripDb.all('SELECT * FROM biketrips WHERE Duration=6969696;', (err, result) => {
            console.log(result)
        })

    })
}

testFetchDb()
