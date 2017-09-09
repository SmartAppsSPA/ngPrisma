import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from "../../services/carga-imagenes.service";
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styles: []
})
export class CodeComponent implements OnInit {

  imagenes: any; //FirebaseListObservable<any[]>;
  JSON: any;
  modalimg: any;
  code: any;

  constructor(public _cargaImagenes:CargaImagenesService){
    this.JSON = JSON;
  }

  ngOnInit() {
  }

  loadImages() {
    this._cargaImagenes.loadByCode(this.code).then(data => {
      this.imagenes = data;
      console.log(data);
    });
  }

  loadModalImage(url){
    this.modalimg = url;
  }

}
