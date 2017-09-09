import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FileItem } from '../models/file-item';

import * as firebase from 'firebase';

@Injectable()
export class CargaImagenesService {

  private CARPETA_IMAGENES:string = 'img'

  constructor(public afDB: AngularFireDatabase){

  }

  random_string = function(q) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

    for (var i = 0; i < q; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  listaUltimasImagenes( numeroImagenes:number ) {

    return new Promise(resolve => {
      this.afDB.list(this.CARPETA_IMAGENES,{
        query:{
          limitToLast: numeroImagenes
        }
      }).subscribe(data => {
        let imagenes = [];

        data.forEach(function(e, i) {
          let img = [];
          let howmany = 0;
          
          for (let j in e) {
            if (++howmany < 6) {
              img.push(e[j]);              
            }
          }

          imagenes.push({
            key: e.$key,
            img: img
          });
        });

        resolve(imagenes);
      });
    })
  }

  loadByCode( code:any ) {

    return new Promise(resolve => {
      this.afDB.list(this.CARPETA_IMAGENES + '/' + code).subscribe(data => {
        let imagenes = [];

        data.forEach(function(e, i) {
          imagenes.push(e);
        });

        resolve(imagenes);
      });
    })
  }

  cargar_imagenes_firebase(archivos:FileItem[], code: any){
    console.log(archivos);
    let storageRef = firebase.storage().ref();

    for(let item of archivos){
      item.estadoSubiendo = true;

      let random_name = this.random_string(12) + '.jpg';

      let uploadTask:firebase.storage.UploadTask = storageRef.child(this.CARPETA_IMAGENES + '/' + random_name).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progreso = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100,
        (error) => console.error("Error al subir ",error),
        () =>{
          item.url = uploadTask.snapshot.downloadURL;
          item.estadoSubiendo = false;
          this.guardarImagen({nombre: random_name, url: item.url}, code);
        }
      )
    }
  }
  private guardarImagen(imagen:any, code){
    this.afDB.list(this.CARPETA_IMAGENES + '/' + code).push(imagen);
  }
}
