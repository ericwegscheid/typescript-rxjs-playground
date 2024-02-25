"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function run() {
    let group = [];
    let otherGroup = [];
    (0, rxjs_1.from)([1, 2, 3]).pipe((0, rxjs_1.tap)((item) => {
        group.push(item);
        console.log('for item', item);
    }), (0, rxjs_1.tap)(() => {
        otherGroup = [...group];
        // console.log('reseting other group again');
    }), (0, operators_1.concatMap)(() => (0, rxjs_1.from)(group).pipe(
    //tap((item) => console.log('item?', item)),
    (0, operators_1.concatMap)((item) => {
        return (0, rxjs_1.of)(item).pipe((0, rxjs_1.tap)(() => console.log('   processing', item)));
    })))).subscribe(() => {
        //console.log(group);
        //console.log(otherGroup);
        console.log('-------------');
    });
}
exports.run = run;
