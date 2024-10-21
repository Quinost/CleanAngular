import { AfterViewInit, Component, computed, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { UserList } from '../../../core/services/users/users';
import { UsersService } from '../../../core/services/users/users.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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
    MatButtonModule
  ]
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserList>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsList = ['id', 'username', 'isActive'];

  columns = new FormControl('');

  constructor(private userService: UsersService, private router: Router) {}

  dataSource = computed(() => this.userService.getUsersSignal());

  totalItems = computed(() => this.userService.getUsersSignal().length);

  ngAfterViewInit(): void {
    this.userService.loadList("", 1, 15);
  }

  onAddNew(): void {
    this.router.navigate(['users/new']);
  }
}
