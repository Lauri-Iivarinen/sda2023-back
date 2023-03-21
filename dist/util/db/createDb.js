"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bikestationsDbInit_1 = require("./bikestationsDbInit");
const dbTest_1 = require("./dbTest");
const main = () => {
    (0, bikestationsDbInit_1.createBikestations)();
    //createTrips()
    //doCleanup()
    (0, dbTest_1.testFetchDb)();
};
main();
