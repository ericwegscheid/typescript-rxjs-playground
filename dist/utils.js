"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockThrow = exports.mock = exports.timeout = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function timeout(obs, time = 0) {
    return (0, rxjs_1.timer)(time).pipe((0, operators_1.concatMapTo)(obs));
}
exports.timeout = timeout;
function mock(data, time = 500) {
    return timeout((0, rxjs_1.of)(data), time);
}
exports.mock = mock;
function mockThrow(error = new Error('has error'), time = 500) {
    return timeout((0, rxjs_1.throwError)(error), time);
}
exports.mockThrow = mockThrow;
