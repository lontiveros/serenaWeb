import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-bo-header',
	templateUrl: './bo-header.component.html',
	styleUrls: ['./bo-header.component.css']
})
export class BoHeaderComponent implements OnInit {
	@Input() breadcrumbs: Array<any> = [];

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
	}

	cerrarSesion() {
		firebase.auth().signOut().then(_response => {
			localStorage.setItem('userLogged', "false")
			this.router.navigateByUrl('/login');
		}, _error => {
			Swal.fire('Error inesperado', 'Ha ocurrido un error inesperado en el servidor.\n Contacte al administrador del sistema.', "error")
		});
	}

}
