// main.ts

import * as fs from 'fs/promises';
import * as path from 'path';

import { Tarea } from "./gestorDeTareas";
import { mostrarMenu, obtenerOpcion } from "./menu";
import { 
    cargarTareaIO, 
    mostrarTodasIO, 
    modificarTareaIO, 
    eliminarTareaIO, 
    mostrarPorEstadoIO 
} from "./utilidades";

const JSON_FILE_PATH = path.join(__dirname, 'tasks.json');
let nextId = 1;
const generadorId = () => nextId++; 


async function cargarEstadoInicial(): Promise<Tarea[]> {
    try {
        const data = await fs.readFile(JSON_FILE_PATH, 'utf-8');
        const tareasJson: Tarea[] = JSON.parse(data);
        
        if (Array.isArray(tareasJson)) {
            console.log(`\n✅ ${tareasJson.length} tareas cargadas desde el archivo.`);
            
            nextId = tareasJson.length + 1; 
            return tareasJson;
        }
        return [];
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            console.log("⚠️ Archivo 'tasks.json' no encontrado. Iniciando con lista vacía.");
        } else {
            console.error("❌ Error al cargar o parsear tareas:", error);
        }
        return [];
    }
}

async function guardarEstado(tareas: Tarea[]): Promise<void> {
    try {
        const data = JSON.stringify(tareas, null, 2);
        await fs.writeFile(JSON_FILE_PATH, data, 'utf-8');
        console.log(`\n💾 Tareas guardadas en tasks.json.`);
    } catch (error) {
        console.error("❌ Error al guardar las tareas:", error);
    }
}



async function main() {
    let estadoTareas: Tarea[] = await cargarEstadoInicial();
    let salir = false;

    while (!salir) {
        mostrarMenu();
        const opcion = obtenerOpcion();
        console.clear();

        let proximoEstado = estadoTareas;

        switch (opcion) {
            case '1':
                proximoEstado = cargarTareaIO(estadoTareas, generadorId); 
                break;
            case '2':
                mostrarTodasIO(estadoTareas);
                break;
            case '3':
                proximoEstado = modificarTareaIO(estadoTareas);
                break;
            case '4':
                proximoEstado = eliminarTareaIO(estadoTareas);
                break;
            case '5':
                mostrarPorEstadoIO(estadoTareas);
                break;
            case '6':
                salir = true;
                break;
            default:
                console.log("Opción no válida.");
                break;
        }

        estadoTareas = proximoEstado;
        
        if (opcion !== '2' && opcion !== '5' && opcion !== '6' && opcion !== '') {
            await guardarEstado(estadoTareas); 
        }

    }
    console.log("👋 ¡Adiós!");
}

main().catch(console.error);

