import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

export interface Column {
  field: string;
  header: string;
}

@Component({
  imports: [CommonModule, TableModule],
  selector: 'app-data-table',
  styleUrl: './data-table.css',
  templateUrl: './data-table.html',
})
export class DataTable {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() rows: number = 10;
  @Input() globalFilterFields: string[] = [];
  @Input() showFilter: boolean = false;
}
