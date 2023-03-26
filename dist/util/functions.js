"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitRow = exports.getData = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
/** Return all rows as string from csv file */
const getData = (pathName, name) => {
    let file = path_1.default.join(__dirname, '..', '..', pathName + name);
    const lines = (0, fs_1.readFileSync)(file, 'utf-8').split('\n');
    const removed = lines.splice(0, 1);
    return lines;
};
exports.getData = getData;
/** Checks if there are commas wrapped around "" and edits them accordingly for DB usage */
const splitRow = (item) => {
    const rowHasParenthesis = item.includes('"');
    if (rowHasParenthesis) {
        let array = [];
        let arr = item.split(',');
        let start = true; //Beginning of a string wrapped in ""
        let string = '';
        arr.forEach((text, index) => {
            //Start of a "string"
            if (text.includes('"') && start) {
                string += text.replace('"', '');
                start = false;
                //"string" ends
            }
            else if (text.includes('"') && !start) {
                string += text.replace('"', '');
                array.push(string);
                start = true;
                string = '';
                //"string continues"
            }
            else if (!start) {
                string += text;
            }
            else {
                array.push(text);
            }
        });
        return array;
    }
    else {
        return item.split(',');
    }
};
exports.splitRow = splitRow;
