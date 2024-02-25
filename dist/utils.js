"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function timeout(obs, time = 0) {
    return (0, rxjs_1.timer)(time).pipe((0, operators_1.concatMapTo)(obs));
}
exports.timeout = timeout;
