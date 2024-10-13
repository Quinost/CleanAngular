import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserList, UserModel } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/api/user`;

  users = signal<UserList[]>([]);
  user = signal<UserModel | null>(null);

  constructor(private client: HttpClient) { }

  getById(id: string): void {
    this.client.get<UserModel>(`${this.apiUrl}/${id}`)
      .subscribe((result : UserModel) => {
        this.user.set(result);
    });
  }

  getList(filter: string, pageNumber: number = 1, pageSize: number = 25): void {
    const params = new HttpParams()
      .set('filter', filter)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    this.client.get<UserList[]>(`${this.apiUrl}`, { params })
      .subscribe((result : UserList[]) => {
        this.users.set(result);
    });
  }
}
