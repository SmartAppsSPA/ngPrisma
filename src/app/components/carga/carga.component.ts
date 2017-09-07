import { Component} from '@angular/core';
import { FileItem } from "../../models/file-item";
import { CargaImagenesService } from "../../services/carga-imagenes.service";


@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent{

  estaSobreDropZone:boolean = false;
  permiteCargar:boolean = true;
  archivos:FileItem[] = [];
  code: string;

  constructor(public _cargaImagenes: CargaImagenesService) {
    this.code = '';
  }
  archivoSobreDropZone(e:boolean){
    this.estaSobreDropZone = e;
  }

  cargarImagenesFirebase(){
    this.permiteCargar = false;
    this._cargaImagenes.cargar_imagenes_firebase(this.archivos, this.code);
  }
  limpiarArchivos(){
    this.archivos = [];
    this.permiteCargar = true;
  }


}
