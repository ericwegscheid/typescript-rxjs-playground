"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("../utils");
function run() {
    let group = [];
    let otherGroup = [];
    const timeoutValues = [3000, 2000, 1000, 3000];
    (0, rxjs_1.from)([0, 1, 2, 3]).pipe((0, operators_1.tap)((item) => {
        console.log(`\npushing item, '${item}', onto the group array`);
        group.push(item * 10);
        otherGroup = [...group];
    })).subscribe((yup) => {
        console.log('yup', yup);
        console.log('subscribe handler called');
        console.log('group:     ', group);
        console.log('otherGroup:', otherGroup);
        console.log('---------');
        (0, rxjs_1.from)(group).pipe((0, operators_1.concatMap)((item) => {
            return (0, utils_1.timeout)((0, rxjs_1.of)(item).pipe((0, operators_1.tap)((item) => console.log(item)), (0, operators_1.map)((item) => item * 10)), timeoutValues[item]);
        })).subscribe((result) => {
            console.log('result', result);
        });
    });
}
exports.run = run;
