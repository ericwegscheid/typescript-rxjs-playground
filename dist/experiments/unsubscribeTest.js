"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function run() {
    let count = 0;
    let index = 0;
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'last'];
    let resource = arr[0];
    const ticker = setInterval(() => {
        resource = arr[index++];
        console.log('resource change: ', resource);
    }, 1000);
    const report = () => {
        // console.log('  count:', count);
        console.log('  index:', index);
        console.log('  resource:', resource);
        console.log('  sub.closed:', sub.closed);
    };
    // const obs$: Observable<string> = timeout(of(resource), 1000);
    const obs$ = (0, rxjs_1.concat)((0, rxjs_1.of)([1, 2, 3, 4]), (0, rxjs_1.of)(['a', 'b']));
    const sub = obs$.pipe((0, operators_1.repeat)({ delay: 5000 })).subscribe((v) => {
        console.log('resource from obs$', v);
    });
    // end after 10 seconds
    setTimeout(() => {
        console.log('');
        console.log('*** ok all done, this is what we ended up with before unsub ***');
        report();
        sub.unsubscribe();
        clearInterval(ticker);
        console.log();
        console.log('*** now after unsub ***');
        report();
    }, 10000);
}
exports.run = run;
