"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const node_assert_1 = require("node:assert");
(0, globals_1.test)('Tests are working', () => {
    node_assert_1.strict.ok('ok');
});
