import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public isMenuOpen: boolean = false;
	public isLogged: boolean = false;

	constructor() { }

	ngOnInit(): void {
		if (localStorage.getItem('userLogged') == "true") {
			this.isLogged = true;
		} else {
			this.isLogged = false;
		}
	}

	closeMenu() {
		this.isMenuOpen = false;
	}
}
