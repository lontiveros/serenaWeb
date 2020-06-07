import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

	constructor(
		private router: Router
	) { }
	
	canActivate() {
		firebase.auth().onAuthStateChanged(_user => {
			if (_user) {
				this.router.navigateByUrl('/admin');
			} else {
				this.router.navigateByUrl('/login');
			}
		});
		return true;
	}

}
