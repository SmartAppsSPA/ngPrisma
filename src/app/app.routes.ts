import { RouterModule, Routes } from '@angular/router';
import {CargaComponent} from './components/carga/carga.component';
import {FotosComponent} from './components/fotos/fotos.component';
import {CodeComponent} from './components/code/code.component';

const app_routes: Routes = [
  { path: 'fotos', component: FotosComponent },
  { path: 'carga', component: CargaComponent },
  { path: 'code', component: CodeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'fotos' }
];

export const app_routing = RouterModule.forRoot(app_routes);
