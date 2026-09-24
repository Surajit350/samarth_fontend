import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LayoutService } from '../layout.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  isDutyManagementOpen = false;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  toggleDutyManagement() {
    this.isDutyManagementOpen = !this.isDutyManagementOpen;
  }

  logout() {
    this.authService.logout();
    this.toast.success('Logged Out', 'You have been successfully logged out.');
    this.router.navigate(['/login']);
  }
}
