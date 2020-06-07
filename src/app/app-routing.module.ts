import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoHomeComponent } from './backoffice/bo-home/bo-home.component';
import { BoUsersComponent } from './backoffice/bo-users/bo-users.component';
import { BoContenidosComponent } from './backoffice/bo-contenidos/bo-contenidos.component';
import { BoProyectosComponent } from './backoffice/bo-proyectos/bo-proyectos.component';
import { LoginComponent } from './backoffice/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CambioPwComponent } from './backoffice/cambio-pw/cambio-pw.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { BoMaterialesComponent } from './backoffice/bo-materiales/bo-materiales.component';
import { BoMontosComponent } from './backoffice/bo-montos/bo-montos.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
	{ 
		path: 'admin', 
		component: BoHomeComponent, 
		children: [
			{ 'path': 'usuarios', component: BoUsersComponent },
			{ 'path': 'contenidos', component: BoContenidosComponent },
			{ 'path': 'proyectos', component: BoProyectosComponent },
			{ 'path': 'materiales', component: BoMaterialesComponent },
			{ 'path': 'montos', component: BoMontosComponent },
		],
		canActivate: [ AuthGuardService ]
	},
	{ path: 'login',pathMatch:'full', component: LoginComponent},
	{ path: '', pathMatch: 'full', component: HomeComponent},
	{ path: 'cambiopw',pathMatch:'full', component: CambioPwComponent},
	{ path: '', pathMatch: 'full', component: LoginComponent},
	{ path: 'marcas', pathMatch: 'full', component: MarcasComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
