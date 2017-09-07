import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FileItem } from '../models/file-item';

import * as firebase from 'firebase';

@Injectable()
export class CargaImagenesService {

  private CARPETA_IMAGENES:string = 'img'

  constructor(public afDB: AngularFireDatabase){

  }

  listaUltimasImagenes( numeroImagenes:number ):FirebaseListObservable<any[]>{
    return this.afDB.list(`/${this.CARPETA_IMAGENES}`,{
      query:{
        limitToLast: numeroImagenes
      }
    });
  }
  cargar_imagenes_firebase(archivos:FileItem[]){
    console.log(archivos);
    let storageRef = firebase.storage().ref();

    for(let item of  archivos){
      item.estadoSubiendo = true;

      let uploadTask:firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progreso = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100,
        (error) => console.error("Error al subir ",error),
        () =>{
          item.url = uploadTask.snapshot.downloadURL;
          item.estadoSubiendo = false;
          this.guardarImagen({nombre: item.nombreArchivo, url: item.url});
        }
      )
    }
  }
  private guardarImagen(imagen:any){
    this.afDB.list(`${this.CARPETA_IMAGENES}`).push(imagen);
  }
}
