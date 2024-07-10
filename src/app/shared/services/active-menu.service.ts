import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ActiveMenuService {
    private menu = new BehaviorSubject<boolean>(false);
    activeMenu = this.menu.asObservable();

    changeActiveMenu(active: boolean) {
        this.menu.next(active);
    }
}
