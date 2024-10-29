import { inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NewUser, UserList, UserModel } from './users';
import { Router } from '@angular/router';
import { Result } from '@core/base/result';
import { NotificationService } from '../notification/notification.service';
import { handleResult } from '@core/base/handle-result';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/user`;

  private users = signal<UserList[]>([])
  private user = signal<UserModel | null>(null)

  client = inject(HttpClient);
  router = inject(Router);
  notificationService = inject(NotificationService);

  public get getUsersSignal(): Signal<UserList[]> { return this.users.asReadonly(); }

  loadById(id: string): void {
    this.client.get<UserModel>(`${this.apiUrl}/${id}`)
      .pipe(tap((result: UserModel) => this.user.set(result))).subscribe();
  }

  loadList(filter: string, pageNumber: number = 1, pageSize: number = 25): void {
    const params = new HttpParams()
      .set('filter', filter)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    this.client.get<UserList[]>(`${this.apiUrl}`, { params })
      .pipe(tap((result: UserList[]) => this.users.set(result))).subscribe();
  }

  add(item: NewUser): void {
    this.client.post<Result>(`${this.apiUrl}`, item)
      .pipe(handleResult(this.notificationService))
      .subscribe({
        next: () => {
          this.notificationService.success('Added');
          this.router.navigate(['/users'])
        }
      });
  }

  delete(id: string): void {
    this.client.delete<Result>(`${this.apiUrl}/${id}`)
      .pipe(handleResult(this.notificationService))
      .subscribe({
        next: () => {
          this.notificationService.success('Deleted');
          this.users.update((value: UserModel[]) => value.filter(x => x.id != id))
        }
      });
  }
}
