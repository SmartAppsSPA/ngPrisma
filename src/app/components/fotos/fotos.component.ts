import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from "../../services/carga-imagenes.service";
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  imagenes: any; //FirebaseListObservable<any[]>;
  JSON: any;
  modalimg: any;

  constructor(public _cargaImagenes:CargaImagenesService){
    this.JSON = JSON;
    this._cargaImagenes.listaUltimasImagenes(5).then(data => {
    	this.imagenes = data;
    });

  }

  ngOnInit() {
  }

  loadModalImage(url){
    this.modalimg = url;
  }

}
