// Función para abrir ventanas
function openWindow(windowId) {
    // Ocultar el mensaje central
    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
        welcomeMessage.style.display = "none"; // Ocultar mensaje
    }

    // Cerrar todas las ventanas abiertas antes de abrir una nueva
    closeAllWindows();

    // Seleccionar la ventana a abrir
    const windowElement = document.getElementById(windowId);

    if (windowElement) {
        // Asegurarse de que la ventana esté centrada
        windowElement.style.display = "block"; // Mostrar la ventana
        windowElement.style.top = "50%"; // Centrar verticalmente
        windowElement.style.left = "50%"; // Centrar horizontalmente
        windowElement.style.transform = "translate(-50%, -50%)"; // Ajustar el centro
    }

    // Verificar si hay ventanas abiertas
    checkWindows();
}

// Función para cerrar todas las ventanas
function closeAllWindows() {
    const windows = document.querySelectorAll('.window');
    windows.forEach((windowElement) => {
        windowElement.style.display = "none"; // Ocultar cada ventana
    });

    // Verificar si hay ventanas abiertas
    checkWindows();
}

// Función para cerrar una ventana específica
function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = "none"; // Ocultar la ventana
    }

    // Verificar si hay ventanas abiertas
    checkWindows();
}

// Función para verificar si hay ventanas abiertas
function checkWindows() {
    const windows = document.querySelectorAll(".window");
    let isAnyWindowOpen = false;

    windows.forEach(win => {
        if (win.style.display === "block") {
            isAnyWindowOpen = true;
        }
    });

    // Mostrar u ocultar el mensaje central según si hay ventanas abiertas
    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
        if (isAnyWindowOpen) {
            welcomeMessage.style.display = "none";
        } else {
            welcomeMessage.style.display = "block";
        }
    }
}

// Carga de pantalla animada
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("fade-out");
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
        }, 500);
    }, 2000);
});

// Configuración de partículas
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#000000" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#000000", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2 }
    },
    "interactivity": {
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } }
    }
});

// Función para hacer las ventanas arrastrables
function makeDraggable(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    const header = win.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = "1000"; // Traer la ventana al frente
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Hacer todas las ventanas arrastrables
document.addEventListener("DOMContentLoaded", () => {
    makeDraggable('habilidades');
    makeDraggable('experiencia');
    makeDraggable('contacto');
});

// Variable para el footer
const footer = document.querySelector('footer');

// Detecta el evento de desplazamiento (scroll)
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { // Ajusta el valor según cuánto quieras que baje el usuario
        footer.style.bottom = '0'; // Muestra el footer cuando el usuario ha bajado lo suficiente
    } else {
        footer.style.bottom = '-100px'; // Oculta el footer si está en la parte superior
    }
});
