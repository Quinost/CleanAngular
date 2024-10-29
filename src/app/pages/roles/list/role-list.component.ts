import { AfterViewInit, Component, computed, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { RolesService } from '@core/services/roles/roles.service';
import { Router } from '@angular/router';
import { RoleList } from '@core/services/roles/roles';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'clean-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class RoleListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RoleList>;

  service = inject(RolesService);
  router = inject(Router);

  columnsList = ['id', 'name'];
  displayedColumns = ['actions', ...this.columnsList];

  dataSource = computed(() => this.service.getRolesSignal());
  totalItems = computed(() => this.service.getRolesSignal().length);

  ngAfterViewInit(): void {
    this.service.loadList("", this.paginator.pageIndex + 1 , this.paginator.pageSize);
  }

  onAddNew(): void {
    this.router.navigate(['roles/new']);
  }
  
  onDelete(id: string) : void {
    this.service.delete(id);
  }
}
