import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface RoleListItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: RoleListItem[] = [
  {id: 1, name: 'DefaultRole1'},
  {id: 2, name: 'DefaultRole2'},
  {id: 3, name: 'DefaultRole3'},
  {id: 4, name: 'DefaultRole4'},
  {id: 5, name: 'DefaultRole5'},
  {id: 6, name: 'DefaultRole6'},
  {id: 7, name: 'DefaultRole7'},
  {id: 8, name: 'DefaultRole8'},
  {id: 9, name: 'DefaultRole9'},
  {id: 10, name: 'DefaultRole10'},
  {id: 11, name: 'DefaultRole11'},
  {id: 12, name: 'DefaultRole12'},
  {id: 13, name: 'DefaultRole13'},
  {id: 14, name: 'DefaultRole14'},
  {id: 15, name: 'DefaultRole15'},
  {id: 16, name: 'DefaultRole16'},
  {id: 17, name: 'DefaultRole17'},
  {id: 18, name: 'DefaultRole18'},
  {id: 19, name: 'DefaultRole19'},
  {id: 20, name: 'DefaultRole20'}
];

/**
 * Data source for the RoleList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RoleListDataSource extends DataSource<RoleListItem> {
  data: RoleListItem[] = EXAMPLE_DATA;
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
  connect(): Observable<RoleListItem[]> {
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
  private getPagedData(data: RoleListItem[]): RoleListItem[] {
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
  private getSortedData(data: RoleListItem[]): RoleListItem[] {
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
