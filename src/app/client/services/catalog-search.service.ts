import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CatalogSearchService {
    private _todos = new BehaviorSubject<string>('');
    readonly todos = this._todos.asObservable();

    get getSearch() {
        return this._todos.asObservable();
      }

      public setSearch(data: string) {
          this._todos.next(data)
      }
}
