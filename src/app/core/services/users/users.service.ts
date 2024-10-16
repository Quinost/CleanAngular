import { Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserList, UserModel } from './users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/user`;

  private users = signal<UserList[]>([])
  private user = signal<UserModel | null>(null)

  constructor(private client: HttpClient) { }
 
  public get getUsersSignal() : Signal<UserList[]> { return this.users.asReadonly(); }

  loadById(id: string): void {
    this.users.set([{
      id: "123",
      username: "defaultUser",
      isActive: true
    }])
    return;

    this.client.get<UserModel>(`${this.apiUrl}/${id}`)
      .subscribe((result : UserModel) => {
        this.user.set(result);
    });
  }

  loadList(filter: string, pageNumber: number = 1, pageSize: number = 25): void {
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
