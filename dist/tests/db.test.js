"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const node_assert_1 = require("node:assert");
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database('biketrips');
const getBadData = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get('SELECT count(Duration) as count FROM biketrips WHERE Duration<10 OR Covered_distance<10;', (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    });
});
(0, globals_1.test)('db is clean', () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getBadData();
    console.log(data);
    node_assert_1.strict.deepEqual(data.count, 0);
}));
