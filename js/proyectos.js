document.addEventListener('DOMContentLoaded', function () {
    // Verifica si el modo oscuro está activo en localStorage
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'true') {
        document.body.classList.add('dark'); // Aplica la clase 'dark'
    }
});

document.addEventListener("DOMContentLoaded", cargarProyectos);

const API_URL = "https://app.nocodb.com/api/v2/tables/muehbbisgan37wk/records";
const API_KEY = "8TzsS2iZcAEPvXCPTD44_cfvjgiX08Z_G09bXV9E"; // Token de NocoDB

const headers = {
    "xc-token": API_KEY,
    "Content-Type": "application/json"
};

// 🚀 Cargar proyectos desde la API
async function cargarProyectos() {
    try {
        const response = await fetch(`${API_URL}?offset=0&limit=25&where=`, { method: "GET", headers });

        if (!response.ok) throw new Error("Error al obtener los proyectos");

        const data = await response.json();
        mostrarProyectos(data.list);
    } catch (error) {
        console.error("Error cargando proyectos:", error);
    }
}

// 🎯 Mostrar proyectos en la tabla
function mostrarProyectos(proyectos) {
    const tabla = document.getElementById("tabla-proyectos");
    tabla.innerHTML = "";

    proyectos.forEach(proyecto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${proyecto.Nombre || "Sin nombre"}</td>
            <td>${proyecto.descripcion || "No hay descripción"}</td>
            <td>${proyecto.estado || "Desconocido"}</td>
            <td>${proyecto.Notes || "Media"}</td>
            <td>
                <button onclick="editarProyecto('${proyecto.id}')">✏️ Editar</button>
                <button onclick="eliminarProyecto('${proyecto.id}')">🗑️ Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// ➕ Agregar un nuevo proyecto
async function agregarProyecto() {
    const nombre = prompt("Nombre del proyecto:");
    const descripcion = prompt("Descripción:");
    const estado = prompt("Estado (pendiente/en progreso/completado):");
    const notas = prompt("Notas:");

    if (!nombre || !descripcion || !estado) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const nuevoProyecto = { Nombre: nombre, descripcion, estado, Notes: notas };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify(nuevoProyecto)
        });

        if (!response.ok) throw new Error("Error al agregar el proyecto");

        alert("Proyecto agregado exitosamente.");
        cargarProyectos();
    } catch (error) {
        console.error("Error al agregar proyecto:", error);
    }
}

// ✏️ Editar un proyecto existente
async function editarProyecto(id) {
    const nombre = prompt("Nuevo nombre del proyecto:");
    const descripcion = prompt("Nueva descripción:");
    const estado = prompt("Nuevo estado (pendiente/en progreso/completado):");
    const notas = prompt("Nuevas notas:");

    if (!nombre || !descripcion || !estado) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const proyectoEditado = { Nombre: nombre, descripcion, estado, Notes: notas };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(proyectoEditado)
        });

        if (!response.ok) throw new Error("Error al editar el proyecto");

        alert("Proyecto actualizado correctamente.");
        cargarProyectos();
    } catch (error) {
        console.error("Error al editar proyecto:", error);
    }
}

// 🗑️ Eliminar un proyecto
async function eliminarProyecto(id) {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers
        });

        if (!response.ok) throw new Error("Error al eliminar el proyecto");

        alert("Proyecto eliminado.");
        cargarProyectos();
    } catch (error) {
        console.error("Error al eliminar proyecto:", error);
    }
}
