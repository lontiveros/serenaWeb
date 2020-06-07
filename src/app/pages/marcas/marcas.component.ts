import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/services/firebase/marcas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  public materiales: Array<any> = [];
  
  constructor(
    private marcasService: MarcasService
    ) { }

  ngOnInit(): void {
    this.obtenerMateriales();
  }

  obtenerMateriales() {
    this.materiales = new Array<any>();
    this.marcasService.obtenerMateriales().subscribe(response => {
      response.forEach(material => {        
        this.marcasService.obtenerMaterial(material.payload.doc.id).subscribe(_response => {
          _response.forEach(_material => {
            this.materiales.push({
              id:material.payload.doc.id,
              nombre: _material.payload.doc.id,
              matData: _material.payload.doc.data()
            });
            
          });
        }, _error => Swal.fire('Se presentó un error inesperado.', 'No se pudo obtener la información de los materiales debido a un error inesperado del sistema. \n Por favor contactese con el administrador del sistema.', 'error'));
      });
    }, _error => Swal.fire('Se presento un error inesperado.', 'No se pudo obtener la información de los materiales debido a un error inesperado del sistema. \n Por favor contactese con el administrador del sistema.', 'error'));
    
    
  }


}
