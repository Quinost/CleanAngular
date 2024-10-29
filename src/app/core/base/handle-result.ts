import { NotificationService } from "@core/services/notification/notification.service";
import { Observable, tap, filter, catchError, map, throwError } from "rxjs";
import { Result } from "./result";

export function handleResult<T>(
  notificationService: NotificationService
): (source: Observable<Result<T>>) => Observable<Result<T>> {
  return (source: Observable<Result<T>>) =>
    source.pipe(
      tap((result: Result<T>) => {
        if (!result.isSuccess) {
          notificationService.error(result?.errors?.join(', '));
        }
      }),
      filter((result: Result<T>) => result.isSuccess),
      catchError((error) => {
        console.log(error);
        const result = error.error as Result<T>;
        notificationService.error(result?.errors?.join(', ') || 'Unexpected error occurred');
        return throwError(() => new Error(result?.errors?.join(', ') || 'Unknown error'));
      })
    );
}