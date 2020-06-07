import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-bo-users',
	templateUrl: './bo-users.component.html',
	styleUrls: ['./bo-users.component.css']
})
export class BoUsersComponent implements OnInit {
	public breadcrumbs: Array<any> = [];
	
	constructor() { }

	ngOnInit(): void {
		this.breadcrumbs = [{ "title": "Administración de usuarios" }]
	}

}
