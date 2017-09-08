import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FileItem } from '../models/file-item';

import * as firebase from 'firebase';

@Injectable()
export class CargaImagenesService {

  private CARPETA_IMAGENES:string = 'img'

  constructor(public afDB: AngularFireDatabase){

  }

  /*listaUltimasImagenes( numeroImagenes:number ):FirebaseListObservable<any[]>{
    return this.afDB.list(this.CARPETA_IMAGENES,{
      query:{
        limitToLast: numeroImagenes
      }
    });
  }*/

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
            if (++howmany < 2) {
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

  cargar_imagenes_firebase(archivos:FileItem[], code: any){
    console.log(archivos);
    let storageRef = firebase.storage().ref();

    for(let item of  archivos){
      item.estadoSubiendo = true;

      let uploadTask:firebase.storage.UploadTask = storageRef.child(this.CARPETA_IMAGENES + '/' + item.nombreArchivo).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progreso = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100,
        (error) => console.error("Error al subir ",error),
        () =>{
          item.url = uploadTask.snapshot.downloadURL;
          item.estadoSubiendo = false;
          this.guardarImagen({nombre: item.nombreArchivo, url: item.url}, code);
        }
      )
    }
  }
  private guardarImagen(imagen:any, code){
    this.afDB.list(this.CARPETA_IMAGENES + '/' + code).push(imagen);
  }
}
