import { Observable, timer } from 'rxjs';
import { concatMapTo } from 'rxjs/operators';

export function timeout<T>(obs: Observable<T>, time = 0): Observable<T> {
  return timer(time).pipe(concatMapTo(obs));
}
