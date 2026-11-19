
const filtros = document.querySelectorAll(".filtro-portfolio");
const proyectos = document.querySelectorAll(".proyecto");

const visor = document.getElementById("visor-portfolio");
const imagen = document.getElementById("imagen-portfolio");
const titulo = document.getElementById("titulo-portfolio");
const cerrar = document.getElementById("cerrar-portfolio");

// FILTRAR PROYECTOS

filtros.forEach(boton => {
    boton.addEventListener("click", () => {

        filtros.forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");

        const categoria = boton.dataset.filtro;

        proyectos.forEach(proyecto => {
            const mostrar =
                categoria === "todos" ||
                proyecto.dataset.categoria === categoria;

            proyecto.hidden = !mostrar;
        });
    });
});

// ABRIR IMÁGENES

proyectos.forEach(proyecto => {
    proyecto.addEventListener("click", () => {
        const foto = proyecto.querySelector("img");

        imagen.src = foto.src;
        imagen.alt = foto.alt;
        titulo.textContent = proyecto.dataset.titulo;

        visor.showModal();
    });
});

// CERRAR VISOR

cerrar.addEventListener("click", () => {
    visor.close();
});

visor.addEventListener("click", evento => {
    if (evento.target === visor) {
        visor.close();
    }
});