

export function Tarea(
  this:any,
  titulo: string,
  descripcion: string,
  tareaEscrita: string,
  estadoTarea: string,
  fechaActual: Date,
  dificultadTarea: string
) {
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.tareaEscrita = tareaEscrita;
  this.estadoTarea = estadoTarea;
  this.fechaActual = fechaActual;
  this.dificultadTarea = dificultadTarea;
}


Tarea.prototype.mostrar = function () {
  console.log("Título:", this.titulo);
  console.log("Descripción:", this.descripcion);
  console.log("Tarea:", this.tareaEscrita);
  console.log("Estado:", this.estadoTarea);
  console.log("Fecha:", this.fechaActual);
  console.log("Dificultad:", this.dificultadTarea);
};