import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-page-header',
  styleUrl: './page-header.css',
  templateUrl: './page-header.html',
})
export class PageHeader {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon: string = 'pi-th-large';
}
