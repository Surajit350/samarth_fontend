import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebarOpenSubject = new BehaviorSubject<boolean>(true);
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  constructor() {
    // Check screen width to auto-collapse on mobile initially
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      this.sidebarOpenSubject.next(false);
    }
  }

  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  setSidebarState(isOpen: boolean) {
    this.sidebarOpenSubject.next(isOpen);
  }
}
