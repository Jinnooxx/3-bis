const prompt = require("prompt-sync")();


export function mostrarMenu(): void {
    console.log("\n--- GESTOR DE TAREAS ---");
    console.log("1. Crear nueva tarea");
    console.log("2. Mostrar todas las tareas");
    console.log("3. Modificar el estado de una tarea por ID");
    console.log("4. Eliminar una tarea por ID");
    console.log("5. Mostrar tareas por estado");
    console.log("6. Salir");
    console.log("------------------------------------------");
}


export function obtenerOpcion(): string {
    return prompt("Seleccione una opción: ");
}