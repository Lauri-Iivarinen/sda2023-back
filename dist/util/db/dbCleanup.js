"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doCleanup = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database('biketrips');
/** Delete rows from db based on recommendations in exercise */
const doCleanup = () => {
    db.serialize(() => {
        db.run('DELETE FROM biketrips WHERE Duration<10 OR Covered_distance<10;');
    });
};
exports.doCleanup = doCleanup;
(0, exports.doCleanup)();
