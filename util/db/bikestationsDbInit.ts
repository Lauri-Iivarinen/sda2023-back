import sqlite3 from "sqlite3";
import { getData, splitRow } from "../functions";

const db = new sqlite3.Database('sqliteDB')

/** Create bikestations table and insert data from csv */
export const createBikestations = () => {
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
            ,y REAL);`
        db.run(sqlCreate)
        
        const data = getData('dist/util/csv/','bikestations.csv')
        const rows = data.map(row => splitRow(row))
        rows.pop() //last row is empty
        console.log(rows.length)

        const sqlInsert = db.prepare('INSERT INTO bikestations (FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);')
        rows.forEach(rowData => {
            sqlInsert.run(rowData)
        })
        
        //db.run('INSERT INTO bikestations (FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);', rows)
        sqlInsert.finalize()
    })
}

createBikestations()

