import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { tap, finalize } from 'rxjs/operators';

@Component({
	selector: 'app-galeria-upload-task',
	templateUrl: './galeria-upload-task.component.html',
	styleUrls: ['./galeria-upload-task.component.css']
})
export class GaleriaUploadTaskComponent implements OnInit {
	@Input() file: File;
	@Input() proyectoNombre: string;

	@Output() imageUploaded: EventEmitter<any> = new EventEmitter<any>();

	public uploadTask: AngularFireUploadTask;
	public percentage: Observable<number>;
	public snapshot: Observable<any>;
	public downloadUrl: string;

	constructor(
		private storage: AngularFireStorage,
		private firestore: AngularFirestore
	) { }

	ngOnInit(): void {
		this.startUpload();
	}

	startUpload() {
		const path = `${this.proyectoNombre}/${new Date().getTime()}_${this.file.name}`;
		const ref = this.storage.ref(path);

		// Inicia el upload del archivo.
		this.uploadTask = this.storage.upload(path, this.file);

		// Monitoreo del porcentaje de subida.
		this.percentage = this.uploadTask.percentageChanges();
		this.snapshot = this.uploadTask.snapshotChanges().pipe(
			finalize( async() => {
				this.downloadUrl = await ref.getDownloadURL().toPromise();
				this.imageUploaded.emit();
			})
		);
	}

	isActive(snapshot) {
		return snapshot.state === "running" && snapshot.bytesTransferred < snapshot.totalBytes;
	}
}
