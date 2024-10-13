import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface UserListItem {
  name: string;
  id: number;
  role: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UserListItem[] = [
  {id: 1, name: 'User1', role: 'DefaultRole1'},
  {id: 2, name: 'User2', role: 'DefaultRole2'},
  {id: 3, name: 'User3', role: 'DefaultRole3'},
  {id: 4, name: 'User4', role: 'DefaultRole4'},
  {id: 5, name: 'User5', role: 'DefaultRole5'},
  {id: 6, name: 'User6', role: 'DefaultRole6'},
  {id: 7, name: 'User7', role: 'DefaultRole7'},
  {id: 8, name: 'User8', role: 'DefaultRole8'},
  {id: 9, name: 'User9', role: 'DefaultRole9'},
  {id: 10, name: 'User10', role: 'DefaultRole10'},
  {id: 11, name: 'User11', role: 'DefaultRole11'},
  {id: 12, name: 'User12', role: 'DefaultRole12'},
  {id: 13, name: 'User13', role: 'DefaultRole13'},
  {id: 14, name: 'User14', role: 'DefaultRole14'},
  {id: 15, name: 'User15', role: 'DefaultRole15'},
  {id: 16, name: 'User16', role: 'DefaultRole16'},
  {id: 17, name: 'User17', role: 'DefaultRole17'},
  {id: 18, name: 'User18', role: 'DefaultRole18'},
  {id: 19, name: 'User19', role: 'DefaultRole19'},
  {id: 20, name: 'User20', role: 'DefaultRole20'}
];

/**
 * Data source for the UserList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserListDataSource extends DataSource<UserListItem> {
  data: UserListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserListItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserListItem[]): UserListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserListItem[]): UserListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
