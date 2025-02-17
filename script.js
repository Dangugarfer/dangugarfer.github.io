// Función para alternar entre modo claro y oscuro
document.querySelector('.theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
});

// Función para actualizar el ícono del tema
function updateThemeIcon(isDarkMode) {
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Cargar el tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
}

// Llamar a la función para cargar el tema al inicio
loadTheme();

// Función para abrir ventanas
function openWindow(windowId) {
    closeAllWindows();
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = "block";
        windowElement.style.top = "50%";
        windowElement.style.left = "50%";
        windowElement.style.transform = "translate(-50%, -50%)";
    }
    checkWindows();
}

// Función para cerrar todas las ventanas
function closeAllWindows() {
    const windows = document.querySelectorAll('.window');
    windows.forEach((windowElement) => {
        windowElement.style.display = "none";
    });
    checkWindows();
}

// Función para cerrar una ventana específica
function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = "none";
    }
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
    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
        welcomeMessage.style.display = isAnyWindowOpen ? "none" : "block";
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
        "color": { "value": "#000000" }, // Color de partículas en modo claro
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

// Cambiar color de partículas en modo oscuro
function updateParticlesColor(isDarkMode) {
    const particles = window.pJSDom[0].pJS.particles;
    particles.color.value = isDarkMode ? "#ffffff" : "#000000"; // Blanco en modo oscuro, negro en modo claro
    particles.line_linked.color = isDarkMode ? "#ffffff" : "#000000"; // Líneas blancas en modo oscuro
    window.pJSDom[0].pJS.fn.particlesRefresh(); // Actualizar partículas
}

// Llamar a la función para actualizar el color de las partículas al cambiar el tema
document.querySelector('.theme-toggle').addEventListener('click', function () {
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateParticlesColor(isDarkMode);
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
        win.style.zIndex = "1000";
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
    makeDraggable('galeria');
    makeDraggable('cv');
    makeDraggable('proyectos');
    makeDraggable('certificaciones');
    makeDraggable('acerca-de-mi');
});

// Lógica para manejar la navegación de imágenes en Certificaciones y Galería
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar las imágenes de Certificaciones y Galería
    const certificacionesImages = document.querySelectorAll('.certificacion-img');
    const galeriaImages = document.querySelectorAll('.galeria-img');

    // Crear el overlay para las imágenes
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Botón de cierre
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    overlay.appendChild(closeBtn);

    // Botones de navegación
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('nav-btn', 'prev');
    prevBtn.innerHTML = '&larr;';
    overlay.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('nav-btn', 'next');
    nextBtn.innerHTML = '&rarr;';
    overlay.appendChild(nextBtn);

    let currentIndex = 0; // Índice de la imagen actual
    let currentImages = []; // Array para almacenar las imágenes actuales

    // Función para mostrar la imagen en el overlay
    function showImage(index) {
        const clonedImg = currentImages[index].cloneNode(true); // Clonar la imagen
        clonedImg.style.maxWidth = "90%"; // Ajustar el tamaño de la imagen
        clonedImg.style.maxHeight = "90%";
        clonedImg.style.borderRadius = "10px";
        clonedImg.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
        clonedImg.style.cursor = "pointer";

        overlay.innerHTML = ''; // Limpiar el overlay
        overlay.appendChild(closeBtn);
        overlay.appendChild(prevBtn);
        overlay.appendChild(nextBtn);
        overlay.appendChild(clonedImg);
        overlay.classList.add('active');
    }

    // Función para cerrar la imagen
    function closeImage() {
        overlay.classList.remove('active');
    }

    // Cerrar al hacer clic en el botón de cierre
    closeBtn.addEventListener('click', closeImage);

    // Cerrar al hacer clic fuera de la imagen
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closeImage();
        }
    });

    // Navegar a la imagen anterior
    prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
    });

    // Navegar a la siguiente imagen
    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
    });

    // Agrandar la imagen al hacer clic (Certificaciones)
    if (certificacionesImages) {
        certificacionesImages.forEach((img, index) => {
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                currentImages = Array.from(certificacionesImages); // Usar solo imágenes de certificaciones
                currentIndex = index;
                showImage(currentIndex);
            });
        });
    }

    // Agrandar la imagen al hacer clic (Galería)
    if (galeriaImages) {
        galeriaImages.forEach((img, index) => {
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                currentImages = Array.from(galeriaImages); // Usar solo imágenes de galería
                currentIndex = index;
                showImage(currentIndex);
            });
        });
    }
});

// Función para detectar dispositivos móviles
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Función para abrir el modal de PDF o descargar el archivo en móvil
function openPdfModal(pdfUrl) {
    if (isMobile()) {
        // Inicia la descarga en móvil
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfUrl.split('/').pop(); // Usa el nombre del archivo como nombre de descarga
        link.click();
    } else {
        // En equipos de escritorio, abrir el modal
        const pdfViewer = document.getElementById('pdf-modal-viewer');
        pdfViewer.src = pdfUrl;
        document.querySelector('.pdf-modal-overlay').classList.add('active');
    }
}

// Función para cerrar el modal de PDF
function closePdfModal() {
    const pdfViewer = document.getElementById('pdf-modal-viewer');
    pdfViewer.src = ''; // Limpiar el visor
    document.querySelector('.pdf-modal-overlay').classList.remove('active');
}


// Eventos para abrir el modal de PDF al hacer clic en una miniatura
document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll('.pdf-thumbnail');
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
            const pdfUrl = thumbnail.getAttribute('data-pdf');
            openPdfModal(pdfUrl);
        });
    });
});