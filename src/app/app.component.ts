import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  code = environment.code;

  


  constructor(private usuarioService : UsuarioService) {}


   ngOnInit() {
    console.log('environment:'+ this.code)
  }

}
