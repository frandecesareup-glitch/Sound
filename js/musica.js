
const canciones = [
    {
        titulo: "Blinding Lights",
        artista: "The Weeknd",
        genero: "R&B",
        duracion: "3:20",
        color: "#b9272c"
    },
    {
        titulo: "DESPECHÁ",
        artista: "Rosalía",
        genero: "Pop",
        duracion: "2:37",
        color: "#ed3218"
    },
    {
        titulo: "Tití Me Preguntó",
        artista: "Bad Bunny",
        genero: "Urbano",
        duracion: "4:03",
        color: "#087d48"
    },
    {
        titulo: "Provenza",
        artista: "Karol G",
        genero: "Urbano",
        duracion: "3:30",
        color: "#71bdb1"
    },
    {
        titulo: "Anti-Hero",
        artista: "Taylor Swift",
        genero: "Pop",
        duracion: "3:20",
        color: "#78658f"
    },
    {
        titulo: "BIRDS OF A FEATHER",
        artista: "Billie Eilish",
        genero: "Pop",
        duracion: "3:30",
        color: "#245d8b"
    },
    {
        titulo: "Do I Wanna Know?",
        artista: "Arctic Monkeys",
        genero: "Rock",
        duracion: "4:32",
        color: "#444444"
    },
    {
        titulo: "Levitating",
        artista: "Dua Lipa",
        genero: "Pop",
        duracion: "3:23",
        color: "#d77a59"
    }
];

let cancionActual = 0;
let reproduciendo = false;
let generoActual = "Todos";

const lista = document.getElementById("lista-tracks");
const buscador = document.getElementById("buscar-cancion");
const vinilo = document.getElementById("vinilo");
const botonPlay = document.getElementById("play");
const barra = document.getElementById("barra-progreso");

function mostrarCanciones() {
    const texto = buscador.value.toLowerCase();

    const filtradas = canciones.filter(cancion => {
        const coincideTexto =
            cancion.titulo.toLowerCase().includes(texto) ||
            cancion.artista.toLowerCase().includes(texto);

        const coincideGenero =
            generoActual === "Todos" ||
            cancion.genero === generoActual;

        return coincideTexto && coincideGenero;
    });

    lista.innerHTML = filtradas.map(cancion => {
        const indice = canciones.indexOf(cancion);

        return `
            <article class="track">
                <span class="track-numero">
                    ${String(indice + 1).padStart(2, "0")}
                </span>

                <div class="track-portada"
                     style="background:${cancion.color}">
                    ♪
                </div>

                <div class="track-info">
                    <h3>${cancion.titulo}</h3>
                    <p>${cancion.artista} · ${cancion.genero}</p>
                </div>

                <span class="track-duracion">
                    ${cancion.duracion}
                </span>

                <button data-indice="${indice}">
                    SELECCIONAR ▶
                </button>

                <button data-youtube="${indice}">
                    YOUTUBE ↗
                </button>
            </article>
        `;
    }).join("");

    if (filtradas.length === 0) {
        lista.innerHTML = "<p>No encontramos canciones con esa búsqueda.</p>";
    }
}

function seleccionarCancion(indice) {
    cancionActual = indice;
    reproduciendo = false;
    actualizarReproductor();
}

function actualizarReproductor() {
    const cancion = canciones[cancionActual];

    document.getElementById("titulo-actual").textContent = cancion.titulo;
    document.getElementById("artista-actual").textContent = cancion.artista.toUpperCase();
    document.getElementById("duracion").textContent = cancion.duracion;
    document.getElementById("tiempo-actual").textContent = "0:00";

    barra.value = 0;
    botonPlay.textContent = reproduciendo ? "Ⅱ" : "▶";

    vinilo.classList.toggle("girando", reproduciendo);
    document.querySelector(".onda").classList.toggle("animada", reproduciendo);
}

botonPlay.addEventListener("click", () => {
    reproduciendo = !reproduciendo;
    botonPlay.textContent = reproduciendo ? "Ⅱ" : "▶";
    vinilo.classList.toggle("girando", reproduciendo);
    document.querySelector(".onda").classList.toggle("animada", reproduciendo);
});

document.getElementById("siguiente").addEventListener("click", () => {
    seleccionarCancion((cancionActual + 1) % canciones.length);
});

document.getElementById("anterior").addEventListener("click", () => {
    seleccionarCancion((cancionActual - 1 + canciones.length) % canciones.length);
});

document.querySelectorAll(".categoria").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".categoria").forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");
        generoActual = boton.dataset.genero;
        mostrarCanciones();
    });
});

buscador.addEventListener("input", mostrarCanciones);

lista.addEventListener("click", evento => {
    const seleccionar = evento.target.closest("[data-indice]");
    const youtube = evento.target.closest("[data-youtube]");

    if (seleccionar) {
        seleccionarCancion(Number(seleccionar.dataset.indice));
    }

    if (youtube) {
        const cancion = canciones[Number(youtube.dataset.youtube)];
        const busqueda = encodeURIComponent(cancion.titulo + " " + cancion.artista + " official audio");
        window.open("https://www.youtube.com/results?search_query=" + busqueda, "_blank", "noopener");
    }
});

mostrarCanciones();
actualizarReproductor();
