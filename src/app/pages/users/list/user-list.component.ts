import { AfterViewInit, Component, computed, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { UserList } from '@core/services/users/users';
import { UsersService } from '@core/services/users/users.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'clean-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserList>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsList = ['id', 'username','roleName', 'isActive'];
  displayedColumns = ['actions', ...this.columnsList];

  service = inject(UsersService);
  router = inject(Router);

  dataSource = computed(() => this.service.getUsersSignal());
  totalItems = computed(() => this.service.getUsersSignal().length);

  ngAfterViewInit(): void {
    this.service.loadList("", this.paginator.pageIndex + 1 , this.paginator.pageSize);
  }

  onAddNew(): void {
    this.router.navigate(['users/new']);
  }
  
  onDelete(id: string) : void {
    this.service.delete(id);
  }
}
