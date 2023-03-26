import sqlite3 from "sqlite3";
import { Bikestation, Trip } from "../../types/dbTypes";

/*
const stationDb = new sqlite3.Database('bikestations')
const tripDb = new sqlite3.Database('biketrips')
*/

const db = new sqlite3.Database('sqliteDB')
/** Fetch some lines from each table and print out results */
export const testFetchDb = () => {
    db.serialize(() => {
        db.all('SELECT * FROM bikestations;', (err, result: Bikestation[]) => {
            console.log('Stations: ' + result.length)
        })

        db.all('SELECT * FROM biketrips;', (err, result) => {
            console.log('Trips: ' + result.length)
            console.log(result[1])
        })

        db.all('SELECT * FROM biketrips WHERE Departure_station_id=501 ORDER BY datetime(Departure) ASC;', (err, result) => {
            console.log(result[0])
        })
        
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
        LEFT JOIN (SELECT Min(datetime(Departure)) as Departure
            ,Return
            ,Departure_station_id
            ,Departure_station_name
            ,Return_station_id
            ,Return_station_name
            ,Covered_distance
            ,Duration
            FROM biketrips
            GROUP BY Departure_station_id) as b
        ON a.ID=b.Departure_station_id;`

        db.all(sql, (err, result) => {
            console.log(result[0])
            //console.log(result[1])
        })

    })

}

testFetchDb()
