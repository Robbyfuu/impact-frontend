import { ICollaborator } from './../../../interfaces/collaborator';
import { CollaboratorService, UiServiceService } from 'src/app/services';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
  dataSource: ICollaborator[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private collaboratorService: CollaboratorService,
    private uiService: UiServiceService,
    private route : Router,

  ) {}

  ngOnInit() {
    this.collaboratorService.getCollaborators().subscribe((response) => {
      this.dataSource = response.trabajadores!;
    });
   
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
}
