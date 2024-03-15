import { of, Observable, throwError, timer } from 'rxjs';
import { concatMapTo } from 'rxjs/operators';

export function timeout<T>(obs: Observable<T>, time = 0): Observable<T> {
  return timer(time).pipe(concatMapTo(obs));
}

export function mock<T>(data: any, time = 500): Observable<T> {
  return timeout<T>(of(data), time);
}

export function mockThrow<T>(error: Error = new Error('has error'), time = 500): Observable<T> {
  return timeout<T>(throwError(error), time);
}
