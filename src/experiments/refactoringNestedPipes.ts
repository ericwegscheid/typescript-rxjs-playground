import { Subject, of, from, timer } from 'rxjs';
import { catchError, concatMap, filter, map, mapTo, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';

import { mock, mockThrow } from '../utils';


export function run(): void {
  // const chunks = [mock('chunk1', 500), mock('chunk2', 1000), mock('chunk3', 2000)];

  const chunks = ['chunk1', 'chunk2', 'chunk3'];
  const files = [{ name: 'f1', chunks }, { name: 'f2', chunks }, { name: 'f3', chunks}];

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
    return mock('upload.chunk-' + a);
  }

  const fnFinishBlob = () => {
    return mock('finish.blob');
  }

  mock('blobs.create').pipe(
    switchMap(() => {
      return from(chunks).pipe(
        mergeMap((chunk, index) => {
          return mock('blobs.upload-' + chunk + '-' + index).pipe(
            switchMap((a) => {
              return fnUploadChunk(a).pipe(
                map((v) => ({
                  value: v,
                })),
              );
            }),
          );
        }),
        toArray(),
        map((b) => ({
          'bValues': b,
          'originalValues': b.map(c => ({ value: c.value + '-original' })),
        })),
      );
    }),
    switchMap(({ bValues, originalValues }) => {
      return fnFinishBlob();
    }),
  ).subscribe({
    next: (yup) => {
      console.log('>>', yup);
    },
    error: (error) => {
      console.log('error >>:', error)
    },
  });

  // setTimeout(() => obs$.next('a'), 1000);
  // setTimeout(() => obs$.next('b'), 2000);
  // setTimeout(() => obs$.next('c'), 1000);
  // setTimeout(() => obs$.next('d'), 4000);
}



