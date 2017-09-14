import { RouterModule, Routes } from '@angular/router';
import {CargaComponent} from './components/carga/carga.component';
import {FotosComponent} from './components/fotos/fotos.component';
import {CodeComponent} from './components/code/code.component';
<<<<<<< HEAD

=======
>>>>>>> b202b664bf7663c712a38966e541e852b52636c1

const app_routes: Routes = [
  { path: 'fotos', component: FotosComponent },
  { path: 'carga', component: CargaComponent },
  { path: 'code', component: CodeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'fotos' }
];

export const app_routing = RouterModule.forRoot(app_routes);
