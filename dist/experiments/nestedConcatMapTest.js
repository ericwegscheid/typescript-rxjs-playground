"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function run() {
    let group = [];
    let otherGroup = [];
    (0, rxjs_1.from)([1, 2, 3, 4]).pipe((0, rxjs_1.tap)((item) => {
        console.log('');
        console.log(`\npushing item, '${item}', onto the group array`);
        group.push(item);
    }), (0, rxjs_1.tap)(() => {
        otherGroup = [...group];
        console.log('setting `otherGroup` with values from `group`:', JSON.stringify(group));
    }), (0, operators_1.concatMap)(() => {
        console.log('now using the `from` operator again on the `groups` array');
        return (0, rxjs_1.from)(group).pipe((0, operators_1.concatMap)((item) => {
            return (0, rxjs_1.of)(item).pipe((0, rxjs_1.tap)(() => {
                console.log('processing item', item);
                console.log('');
            }));
        }));
    })).subscribe(() => {
        console.log('subscribe handler called');
        console.log('group:     ', group);
        console.log('otherGroup:', otherGroup);
    });
}
exports.run = run;
