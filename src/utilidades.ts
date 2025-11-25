
const prompt = require("prompt-sync")();

import {
    crearTarea,
    agregarTareaPura,
    eliminarTareaPura,
    modificarTareaPura,
    actualizarCampo,
    Tarea, 
    Estado,
    Dificultad
} from "./gestorDeTareas"; 


function obtenerIdValido(mensaje: string): number {
    let id: number;
    let input: string; 
    do {
        input = prompt(mensaje);
        id = parseInt(input);
    } while (isNaN(id) || id <= 0);
    return id;
}

export function mostrarTarea(tarea: Tarea): void {

    console.log(`\n==========================================`);
    console.log(`ID: ${tarea.id} | Dificultad: ${tarea.dificultadTarea}`);
    console.log(`Título: **${tarea.titulo}**`);
    console.log(`Estado: *${tarea.estadoTarea}*`);
    console.log(`Descripción: ${tarea.descripcion}`);
    console.log(`Creación: ${tarea.fechaCreacion.toLocaleDateString()}`);
    console.log(`Última Edición: ${tarea.fechaUltimaEdicion.toLocaleDateString()}`);
    console.log(`==========================================`);
}


export function cargarTareaIO(estadoActual: readonly Tarea[], generadorId: () => number): Tarea[] {
    const titulo: string = prompt("Título: ");
    const descripcion: string = prompt("Descripción: ");
    const tareaEscrita: string = prompt("Detalles (breve): ");
  
    const dificultad: Dificultad = prompt("Dificultad (🌕🌕🌕, 🌓🌓🌓, 🌑🌑🌑): ") as Dificultad;

    const fechaActual: Date = new Date();
    const nuevaTarea: Tarea = crearTarea(generadorId(), titulo, descripcion, tareaEscrita, dificultad, fechaActual);
    
    const proximoEstado: Tarea[] = agregarTareaPura(estadoActual, nuevaTarea);

    console.log(`✅ Tarea '${nuevaTarea.titulo}' creada con éxito.`);
    return proximoEstado; 
}

export function mostrarTodasIO(tareas: readonly Tarea[]): void {
    if (tareas.length === 0) {
        console.log("La lista de tareas está vacía.");
        return;
    }
    console.log(`\n--- LISTA COMPLETA DE TAREAS (${tareas.length}) ---`);
    tareas.forEach(mostrarTarea);
}

export function mostrarPorEstadoIO(tareas: readonly Tarea[]): void {
    const estado: Estado = prompt("Estado a filtrar (Pendiente, En Curso, Finalizada, Cancelada): ") as Estado;
    const tareasFiltradas = tareas.filter(t => t.estadoTarea === estado);

    if (tareasFiltradas.length === 0) {
        console.log(`No hay tareas en estado '${estado}'.`);
        return;
    }

    console.log(`\n--- TAREAS EN ESTADO: ${estado} (${tareasFiltradas.length}) ---`);
    tareasFiltradas.forEach(mostrarTarea);
}

export function modificarTareaIO(tareas: readonly Tarea[]): Tarea[] {
    if (tareas.length === 0) {
        console.log("No hay tareas para modificar.");
        return [...tareas];
    }
    const idModificar = obtenerIdValido("ID de la tarea a modificar: ");
    const tareaExistente = tareas.find(t => t.id === idModificar);

    if (!tareaExistente) {
        console.log(`❌ Tarea con ID ${idModificar} no encontrada.`);
        return [...tareas];
    }
    
    const nuevoEstado: Estado = prompt("Nuevo Estado (Pendiente, En Curso, Finalizada, Cancelada): ") as Estado;
    
    const modificador = actualizarCampo('estadoTarea', nuevoEstado);

    const proximoEstado = modificarTareaPura(tareas, idModificar, modificador, new Date());
    
    console.log(`✅ Tarea ${idModificar} modificada. Nuevo estado: ${nuevoEstado}`);

    return proximoEstado; 
}

export function eliminarTareaIO(tareas: readonly Tarea[]): Tarea[] {
    if (tareas.length === 0) {
        console.log("No hay tareas para eliminar.");
        return [...tareas];
    }
    const idEliminar = obtenerIdValido("ID de la tarea a eliminar: ");
    const tareaAEliminar = tareas.find(t => t.id === idEliminar);

    if (!tareaAEliminar) {
        console.log(`❌ Tarea con ID ${idEliminar} no encontrada.`);
        return [...tareas];
    }

    const proximoEstado = eliminarTareaPura(tareas, idEliminar);

    console.log(`🗑️ Tarea ${idEliminar} ('${tareaAEliminar.titulo}') eliminada con éxito.`);
    
    return proximoEstado; 
}