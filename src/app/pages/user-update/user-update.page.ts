import { CollaboratorService, UiServiceService } from './../../services';
import { Component, OnInit,OnChanges, SimpleChanges, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { ICollaborator } from 'src/interfaces';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit, OnChanges {
  urlReturn = '/usersList';
  collaborator: ICollaborator = {};
  state = this.locationStrategy.getState();
  constructor(
    private collaboratorService: CollaboratorService,
    private route: Router,
    private uiService: UiServiceService,
    private activatedRoute: ActivatedRoute,
    private locationStrategy: LocationStrategy
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.collaboratorService.getCollaborator(params['id']!).subscribe((response) => {
        this.collaborator = response.trabajador!;
      });
    });
    console.log(this.state)
    
  }

  async update(fUpdate: NgForm) {
    if (fUpdate.invalid) {
      return;
    }
    const updateValid = await this.collaboratorService.updateCollaborator(
      this.collaborator
    );
    if (updateValid) {
      this.uiService.presentToast( 'Registro actualizado' );
      
      this.route.navigate( ['/usersList']).then(() => {
        window.location.reload();
      });
  
    } else {
      this.uiService.presentToast( 'No se pudo actualizar' );
    }
  }
}
