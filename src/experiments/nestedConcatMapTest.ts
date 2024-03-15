import { of, from } from 'rxjs';
import { concatMap, filter, map, switchMap, tap } from 'rxjs/operators';

import { timeout } from '../utils';

export function run(): void {
  let group = [];
  let otherGroup = [];
  const timeoutValues = [3000, 2000, 1000, 3000];

  from([0, 1, 2, 3]).pipe(
    tap((item) => {
      console.log(`\npushing item, '${item}', onto the group array`);
      group.push(item * 10);
      otherGroup = [...group];
    }),
  ).subscribe((yup) => {
    console.log('yup', yup);
    console.log('subscribe handler called');
    console.log('group:     ', group);
    console.log('otherGroup:', otherGroup);
    console.log('---------');

    from(group).pipe(
      concatMap((item) => {
        return timeout(
          of(item).pipe(
            tap((item) => console.log(item)),
            map((item) => item * 10),
          ),
          timeoutValues[item as number],
        );
      })
    ).subscribe((result) => {
      console.log('result', result);
    });
  });
}


