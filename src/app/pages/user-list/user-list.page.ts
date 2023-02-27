import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CollaboratorService, UiServiceService } from 'src/app/services';
import { ICollaborator } from '../../../interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido-paterno',
    'apellido-materno',
    'email',
    'telefono',
    'acciones',
  ];
  dataSource: MatTableDataSource<ICollaborator>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;
  collaborators : ICollaborator[] = [];
  constructor(
    private collaboratorService: CollaboratorService,
    private uiService: UiServiceService,
    private route : Router,

  ) {
    
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.collaboratorService.getCollaborators().subscribe((response) => {
      this.collaborators = response['trabajadores']!;
      this.dataSource.data = this.collaborators;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    );
  }
   


  editar(collaborator: ICollaborator) {
    this.route.navigate(['/userUpdate'],{queryParams:collaborator});
  }

  eliminar(collaborator: ICollaborator) {
    this.collaboratorService
      .deleteCollaborator(collaborator.id!).then((response) => {
          this.uiService.alertaInformativa('Se elimino correctamente');
          this.ngOnInit();
        });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
