
const albumes = [
    {
        id: "motomami",
        nombre: "MOTOMAMI",
        artista: "Rosalía",
        genero: "Pop",
        anio: 2022,
        imagen: "img/motomami.jpg",
        descripcion: "Un álbum que combina experimentación sonora, pop y elementos del flamenco."
    },
    {
        id: "unverano",
        nombre: "Un Verano Sin Ti",
        artista: "Bad Bunny",
        genero: "Urbano",
        anio: 2022,
        imagen: "img/unverano.jpg",
        descripcion: "Un proyecto musical que combina reguetón, sonidos caribeños y otros géneros."
    },
    {
        id: "afterhours",
        nombre: "After Hours",
        artista: "The Weeknd",
        genero: "R&B",
        anio: 2020,
        imagen: "img/afterhours.jpg",
        descripcion: "Un álbum con una estética cinematográfica y sonidos synth-pop y R&B."
    },
    {
        id: "midnights",
        nombre: "Midnights",
        artista: "Taylor Swift",
        genero: "Pop",
        anio: 2022,
        imagen: "img/midnights.jpg",
        descripcion: "Un álbum conceptual inspirado en pensamientos y reflexiones nocturnas."
    },
    {
        id: "mananasera",
        nombre: "Mañana Será Bonito",
        artista: "Karol G",
        genero: "Urbano",
        anio: 2023,
        imagen: "img/mananasera.jpg",
        descripcion: "Un álbum que explora diferentes emociones y sonidos de la música urbana."
    },
    {
        id: "hitme",
        nombre: "Hit Me Hard and Soft",
        artista: "Billie Eilish",
        genero: "Pop",
        anio: 2024,
        imagen: "img/hitme.jpg",
        descripcion: "Un proyecto que combina sonidos íntimos, alternativos y experimentales."
    },
    {
        id: "future",
        nombre: "Future Nostalgia",
        artista: "Dua Lipa",
        genero: "Pop",
        anio: 2020,
        imagen: "img/future.jpg",
        descripcion: "Un álbum inspirado en el disco y el dance-pop."
    },
    {
        id: "am",
        nombre: "AM",
        artista: "Arctic Monkeys",
        genero: "Rock",
        anio: 2013,
        imagen: "img/am.jpg",
        descripcion: "Un disco de rock alternativo con influencias de diferentes estilos musicales."
    }
];

let generoSeleccionado = "Todos";

const catalogo = document.getElementById("catalogo-grid");
const buscador = document.getElementById("buscar-album");
const modal = document.getElementById("modal-album");

function mostrarAlbumes() {
    const texto = buscador.value.toLowerCase().trim();

    const filtrados = albumes.filter(album => {
        const coincideTexto =
            album.nombre.toLowerCase().includes(texto) ||
            album.artista.toLowerCase().includes(texto);

        const coincideGenero =
            generoSeleccionado === "Todos" ||
            album.genero === generoSeleccionado;

        return coincideTexto && coincideGenero;
    });

    catalogo.innerHTML = filtrados.map(album => `
        <article class="album-card">
            <img src="${album.imagen}" alt="${album.nombre}">

            <div class="album-info">
                <h3>${album.nombre}</h3>
                <p>${album.artista} · ${album.anio}</p>
                <button data-album="${album.id}">
                    VER ÁLBUM ↗
                </button>
            </div>
        </article>
    `).join("");

    if (filtrados.length === 0) {
        catalogo.innerHTML = "<p>No encontramos álbumes con esa búsqueda.</p>";
    }
}

function abrirAlbum(id) {
    const album = albumes.find(a => a.id === id);

    if (!album) return;

    modal.innerHTML = `
        <img src="${album.imagen}" alt="${album.nombre}">
        <h2>${album.nombre}</h2>
        <p><strong>Artista:</strong> ${album.artista}</p>
        <p><strong>Año:</strong> ${album.anio}</p>
        <p><strong>Género:</strong> ${album.genero}</p>
        <p>${album.descripcion}</p>
        <button id="cerrar-album">CERRAR</button>
    `;

    modal.showModal();

    document.getElementById("cerrar-album").addEventListener("click", () => {
        modal.close();
    });
}

document.addEventListener("click", evento => {
    const boton = evento.target.closest("[data-album]");

    if (boton) {
        abrirAlbum(boton.dataset.album);
    }
});

document.querySelectorAll(".filtro").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".filtro").forEach(b => {
            b.classList.remove("activo");
        });

        boton.classList.add("activo");
        generoSeleccionado = boton.dataset.genero;
        mostrarAlbumes();
    });
});

buscador.addEventListener("input", mostrarAlbumes);

mostrarAlbumes();
