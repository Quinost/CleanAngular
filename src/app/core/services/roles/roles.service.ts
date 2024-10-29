import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { environment } from '@env/environment';
import { tap } from 'rxjs';
import { NewRole, RoleList, RoleModel } from './roles';
import { Result } from '@core/base/result';
import { handleResult } from '@core/base/handle-result';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = `${environment.apiUrl}/role`;

  private roles = signal<RoleList[]>([])
  private role = signal<RoleModel | null>(null)
  
  client = inject(HttpClient);
  router = inject(Router);
  notificationService = inject(NotificationService);

  public get getRolesSignal(): Signal<RoleList[]> { return this.roles.asReadonly(); }

  loadById(id: string): void {
    this.client.get<RoleModel>(`${this.apiUrl}/${id}`)
      .pipe(tap((result: RoleModel) => this.role.set(result))).subscribe();
  }

  loadList(filter: string, pageNumber: number = 1, pageSize: number = 25): void {
    const params = new HttpParams()
      .set('filter', filter)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    this.client.get<RoleList[]>(`${this.apiUrl}`, { params })
      .pipe(tap((result: RoleList[]) => this.roles.set(result))).subscribe();
  }

  add(item: NewRole): void {
    this.client.post<Result>(`${this.apiUrl}`, item)
      .pipe(handleResult(this.notificationService))
      .subscribe({
        next: () => {
          this.notificationService.success('Added');
          this.router.navigate(['/roles'])
        }
      });
  }

  delete(id: string): void {
    this.client.delete<Result>(`${this.apiUrl}/${id}`)
      .pipe(handleResult(this.notificationService))
      .subscribe({
        next: () => {
          this.notificationService.success('Deleted');
          this.roles.update((value: RoleList[]) => value.filter(x => x.id != id))
        }
      });
  }
}
