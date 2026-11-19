
const formulario = document.getElementById("formulario-contacto");
const respuesta = document.getElementById("respuesta-formulario");

// Reemplazá esta dirección por tu correo de contacto.
const correoDestino = "contacto@ejemplo.com";

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !asunto || !mensaje) {
        respuesta.textContent = "Por favor, completá todos los campos.";
        return;
    }

    const asuntoCorreo = encodeURIComponent("SOUND - " + asunto);

    const cuerpoCorreo = encodeURIComponent(
        "Nombre: " + nombre + "\n" +
        "Correo: " + email + "\n" +
        "Asunto: " + asunto + "\n\n" +
        "Mensaje:\n" + mensaje
    );

    const enlace = `mailto:${correoDestino}?subject=${asuntoCorreo}&body=${cuerpoCorreo}`;

    respuesta.textContent =
        "Se abrirá tu aplicación de correo con el mensaje preparado. Revisalo y presioná Enviar para mandarlo.";

    window.location.href = enlace;
});

