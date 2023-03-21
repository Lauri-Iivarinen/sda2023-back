import sqlite3 from "sqlite3";
const db = new sqlite3.Database('biketrips')
/** Delete rows from db based on recommendations in exercise */
export const doCleanup = () => {
    db.serialize(() => {
        db.run('DELETE FROM biketrips WHERE Duration<10 OR Covered_distance<10;')
    })
}

doCleanup()
