import { of, from, tap } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export function run(): void {
  let group = [];
  let otherGroup = [];

  from([1, 2, 3, 4]).pipe(
    tap((item) => {
      console.log('');
      console.log(`\npushing item, '${item}', onto the group array`);
      group.push(item);
    }),
    tap(() => {
      otherGroup = [...group];
      console.log('setting `otherGroup` with values from `group`:', JSON.stringify(group));
    }),
    concatMap(() => {
      console.log('now using the `from` operator again on the `groups` array');
      return from(group).pipe(
        concatMap((item) => {
          return of(item).pipe(
            tap(() => {
              console.log('processing item', item);
              console.log('');
            })
          );
        })
      );
    })
  ).subscribe(() => {
    console.log('subscribe handler called');
    console.log('group:     ', group);
    console.log('otherGroup:', otherGroup);
  });
}


