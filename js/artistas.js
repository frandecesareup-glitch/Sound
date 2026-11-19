
const artistas = [
    {
        id: "badbunny",
        nombre: "Bad Bunny",
        genero: "Urbano",
        pais: "Puerto Rico",
        imagen: "img/badbunny.jpg",
        descripcion: "Bad Bunny es un cantante puertorriqueño que se convirtió en una de las figuras más influyentes de la música urbana. Su propuesta combina reguetón, trap latino y otros estilos."
    },
    {
        id: "rosalia",
        nombre: "Rosalía",
        genero: "Pop",
        pais: "España",
        imagen: "img/rosalia.jpg",
        descripcion: "Rosalía es una cantante española reconocida por fusionar flamenco, pop y sonidos experimentales. Su estilo innovador le permitió alcanzar reconocimiento internacional."
    },
    {
        id: "weeknd",
        nombre: "The Weeknd",
        genero: "R&B",
        pais: "Canadá",
        imagen: "img/weeknd.jpg",
        descripcion: "The Weeknd es un cantante canadiense conocido por su combinación de R&B, pop y música electrónica, con una identidad visual cinematográfica."
    },
    {
        id: "karolg",
        nombre: "Karol G",
        genero: "Urbano",
        pais: "Colombia",
        imagen: "img/karolg.jpg",
        descripcion: "Karol G es una artista colombiana reconocida internacionalmente por sus canciones de reguetón y pop urbano."
    },
    {
        id: "taylor",
        nombre: "Taylor Swift",
        genero: "Pop",
        pais: "Estados Unidos",
        imagen: "img/taylor.jpg",
        descripcion: "Taylor Swift es una cantautora estadounidense que desarrolló diferentes etapas musicales, desde el country hasta el pop."
    },
    {
        id: "billie",
        nombre: "Billie Eilish",
        genero: "Pop",
        pais: "Estados Unidos",
        imagen: "img/billie.jpg",
        descripcion: "Billie Eilish es una cantante estadounidense destacada por su estilo alternativo, su estética visual y su sonido particular."
    },
    {
        id: "dua",
        nombre: "Dua Lipa",
        genero: "Pop",
        pais: "Reino Unido",
        imagen: "img/dualipa.jpg",
        descripcion: "Dua Lipa es una cantante británica reconocida por sus canciones de pop y dance."
    },
    {
        id: "arctic",
        nombre: "Arctic Monkeys",
        genero: "Rock",
        pais: "Reino Unido",
        imagen: "img/arctic.jpg",
        descripcion: "Arctic Monkeys es una banda británica de rock alternativo conocida por su evolución musical y sus álbumes."
    }
];

let generoSeleccionado = "Todos";

const catalogo = document.getElementById("artistas-catalogo");
const buscador = document.getElementById("buscar-artista");
const modal = document.getElementById("modal-artista");

function mostrarArtistas() {
    const texto = buscador.value.toLowerCase().trim();

    const filtrados = artistas.filter(artista => {
        const coincideTexto =
            artista.nombre.toLowerCase().includes(texto) ||
            artista.pais.toLowerCase().includes(texto);

        const coincideGenero =
            generoSeleccionado === "Todos" ||
            artista.genero === generoSeleccionado;

        return coincideTexto && coincideGenero;
    });

    catalogo.innerHTML = filtrados.map(artista => `
        <article class="catalogo-card">
            <img src="${artista.imagen}" alt="${artista.nombre}">

            <div class="catalogo-info">
                <h3>${artista.nombre}</h3>
                <p>${artista.genero} · ${artista.pais}</p>
                <button data-artista="${artista.id}">
                    CONOCER MÁS ↗
                </button>
            </div>
        </article>
    `).join("");

    if (filtrados.length === 0) {
        catalogo.innerHTML = "<p>No encontramos artistas con esa búsqueda.</p>";
    }
}

function abrirArtista(id) {
    const artista = artistas.find(a => a.id === id);

    if (!artista) return;

    modal.innerHTML = `
        <img src="${artista.imagen}" alt="${artista.nombre}">
        <h2>${artista.nombre}</h2>
        <p><strong>Género:</strong> ${artista.genero}</p>
        <p><strong>Origen:</strong> ${artista.pais}</p>
        <p>${artista.descripcion}</p>
        <button id="cerrar-modal">CERRAR</button>
    `;

    modal.showModal();

    document.getElementById("cerrar-modal").addEventListener("click", () => {
        modal.close();
    });
}

document.addEventListener("click", evento => {
    const boton = evento.target.closest("[data-artista]");

    if (boton) {
        abrirArtista(boton.dataset.artista);
    }
});

document.querySelectorAll(".genero").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".genero").forEach(b => {
            b.classList.remove("activo");
        });

        boton.classList.add("activo");
        generoSeleccionado = boton.dataset.genero;
        mostrarArtistas();
    });
});

buscador.addEventListener("input", mostrarArtistas);

mostrarArtistas();
