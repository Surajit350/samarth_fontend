import { Component } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { DataTable } from '../../../shared/components/data-table/data-table';

@Component({
  imports: [PageHeader, DataTable],
  selector: 'app-permission',
  styleUrl: './permission.css',
  templateUrl: './permission.html',
})
export class Permission {
  tableCols = [
    { field: 'id', header: 'ID' },
    { field: 'roleName', header: 'Role Name' },
    { field: 'module', header: 'Module' },
    { field: 'status', header: 'Status' }
  ];

  tableData = [
    { id: 101, roleName: 'Admin', module: 'All Modules', status: 'Active' },
    { id: 102, roleName: 'Manager', module: 'Duty Management', status: 'Active' },
    { id: 103, roleName: 'Staff', module: 'Duty Management', status: 'Inactive' },
    { id: 104, roleName: 'Viewer', module: 'Reports', status: 'Active' }
  ];
}
