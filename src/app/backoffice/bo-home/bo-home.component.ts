import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-bo-home',
	templateUrl: './bo-home.component.html',
	styleUrls: ['./bo-home.component.css']
})
export class BoHomeComponent implements OnInit {
	public opened: boolean = true;
	public sidebarMode: string = "push";
	public isLoading: boolean = false;

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.isLoading = true;
		}, 1000);
	}

	toggleSidebar() {
		this.opened = !this.opened;
	}

}
