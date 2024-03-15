"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("../utils");
function run() {
    // const chunks = [mock('chunk1', 500), mock('chunk2', 1000), mock('chunk3', 2000)];
    const chunks = ['chunk1', 'chunk2', 'chunk3'];
    const files = [{ name: 'f1', chunks }, { name: 'f2', chunks }, { name: 'f3', chunks }];
    // from(files).pipe(
    // concatMap((file) => {
    // return mockThrow();
    // }),
    // ).subscribe({
    // error: (error) => {
    // console.log('there was an error:', error);
    // }
    // });
    // const obs$ = new Subject();
    // obs$.subscribe((a) => {
    // console.log('obs$ >> ', a);
    // });
    const fnUploadChunk = (a) => {
        return (0, utils_1.mock)('upload.chunk-' + a);
    };
    const fnFinishBlob = () => {
        return (0, utils_1.mock)('finish.blob');
    };
    (0, utils_1.mock)('blobs.create').pipe((0, operators_1.switchMap)(() => {
        return (0, rxjs_1.from)(chunks).pipe((0, operators_1.mergeMap)((chunk, index) => {
            return (0, utils_1.mock)('blobs.upload-' + chunk + '-' + index).pipe((0, operators_1.switchMap)((a) => {
                return fnUploadChunk(a).pipe((0, operators_1.map)((v) => ({
                    value: v,
                })));
            }));
        }), (0, operators_1.toArray)(), (0, operators_1.map)((b) => ({
            'bValues': b,
            'originalValues': b.map(c => ({ value: c.value + '-original' })),
        })));
    }), (0, operators_1.switchMap)(({ bValues, originalValues }) => {
        return fnFinishBlob();
    })).subscribe({
        next: (yup) => {
            console.log('>>', yup);
        },
        error: (error) => {
            console.log('error >>:', error);
        },
    });
    // setTimeout(() => obs$.next('a'), 1000);
    // setTimeout(() => obs$.next('b'), 2000);
    // setTimeout(() => obs$.next('c'), 1000);
    // setTimeout(() => obs$.next('d'), 4000);
}
exports.run = run;
