import { test, describe, expect } from '@jest/globals';
import { strict as assert } from 'node:assert';
import sqlite3 from 'sqlite3'
import { getData, splitRow } from '../util/functions';

//Database related functions testcases

const db = new sqlite3.Database('sqliteDB')

interface Count{
    count: number
}

const getBadData = async () => {
    return new Promise<Count>((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT count(Duration) as count FROM biketrips WHERE Duration<10 OR Covered_distance<10;', (err, result: Count) => {
                if (err) reject(err);
				resolve(result);
            })
        })
    })

}

test('db is clean from bad data', async () => {
    const data = await getBadData()
    assert.deepEqual(data.count, 0)
})

test('Rows are split correctly', () => {
    const testString = 'a,b,c'
    assert.deepEqual(splitRow(testString), ['a', 'b', 'c'])
})

test('splitRow detects bad data', () => {
    const testString = 'a,b,"c,d,e",f'
    assert.deepEqual(splitRow(testString), ['a','b','cde', 'f'])
})

test('filereader reads csv correctly', () => {
    const rows = getData('back/tests/testcsv/', 'test.csv')
    assert.deepEqual(rows, ['1,mike','2,sike'])
})
