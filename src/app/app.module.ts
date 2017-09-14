import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CodeComponent } from './components/code/code.component';

//Rutas
import { app_routing } from './app.routes';
// config
import { FIREBASE_CONFIG } from './config/firebase.config';
//Services
import { CargaImagenesService } from './services/carga-imagenes.service';
//directives
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
//Para inputs
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CargaComponent,
    FotosComponent,
    CodeComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  providers: [
    CargaImagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
