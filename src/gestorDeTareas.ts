



export type Estado = 'Pendiente' | 'En Curso' | 'Finalizada' | 'Cancelada';
export type Dificultad = '🌕🌕🌕' | '🌓🌓🌓' | '🌑🌑🌑' | 'Sin definir';

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    tareaEscrita: string;
    estadoTarea: Estado;
    fechaCreacion: Date;
    fechaUltimaEdicion: Date;
    dificultadTarea: Dificultad;
}

type ModificadorTarea = (tarea: Tarea) => Tarea;


export const crearTarea = (
    id: number,
    titulo: string,
    descripcion: string,
    tareaEscrita: string,
    dificultadTarea: Dificultad,
    fechaActual: Date
): Tarea => {
    const nueva: Tarea = {
        id,
        titulo,
        descripcion,
        tareaEscrita,
        estadoTarea: "Pendiente",
        fechaCreacion: fechaActual,
        fechaUltimaEdicion: fechaActual,
        dificultadTarea,
    };
    return Object.freeze(nueva);
};



export const agregarTareaPura = (tareas: readonly Tarea[], nuevaTarea: Tarea): Tarea[] => {
    return [...tareas, nuevaTarea];
};


export const eliminarTareaPura = (tareas: readonly Tarea[], idTarea: number): Tarea[] => {
    return tareas.filter(tarea => tarea.id !== idTarea);
};


export const modificarTareaPura = (
    tareas: readonly Tarea[],
    idTarea: number,
    modificador: ModificadorTarea,
    fechaActual: Date
): Tarea[] => {
    return tareas.map(tarea => {
        if (tarea.id === idTarea) {
            const tareaModificada = modificador(tarea);
            return Object.freeze({
                ...tareaModificada,
                fechaUltimaEdicion: fechaActual,
            });
        }
        return tarea;
    });
};


export const actualizarCampo = (campo: keyof Tarea, nuevoValor: any): ModificadorTarea => (tarea: Tarea) => ({
    ...tarea,
    [campo]: nuevoValor,
});