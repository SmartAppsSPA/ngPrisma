export class FileItem{

  public archivo:File;
  public nombreArchivo:string;
  public url:string;
  public estadoSubiendo:boolean = false;
  public progreso:number = 0;

  constructor(archivo:File){
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
  }

}
