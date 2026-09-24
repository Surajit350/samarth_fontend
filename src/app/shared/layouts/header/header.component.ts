import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../layout.service';
import { AccessibilityService } from '../../../core/services/accessibility.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    public layoutService: LayoutService,
    public accessibility: AccessibilityService
  ) {}
}
