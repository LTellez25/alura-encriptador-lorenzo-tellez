document.addEventListener('DOMContentLoaded', function () {
    const encriptar = document.querySelector("#encriptar");
    const desencriptar = document.querySelector("#desencriptar");
    const copiar = document.querySelector("#copiar");

    encriptar.onclick = encriptarMensaje;
    desencriptar.onclick = desencriptarMensaje;
    copiar.onclick = copiarTexto;

    // Ocultar preloader después de 5 segundos
    setTimeout(() => {
        document.getElementById('preloader_4').style.display = 'none';
        document.body.classList.remove('preload'); // Elimina la clase de preload para mostrar el contenido principal
        document.querySelector('.principal').style.display = 'block'; // Muestra el contenido principal
    }, 2500);
});

function mostrarMensajeModal(mensaje) {
    var modal = document.getElementById("modal");
    var span = document.getElementsByClassName("close")[0];
    var modalMessage = document.getElementById("modal-message");

    modalMessage.textContent = mensaje;
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function mostrar(mensaje) {
    document.querySelector("#texto_resultado").innerHTML = mensaje;
}

function actualizarPantalla() {
    document.querySelector("#resultado_mensaje").style.display = "none";
    document.querySelector("#muneco").style.display = "none";
    document.querySelector("#mensaje_inicial").style.display = "none";
    document.querySelector("#mensaje_inicial_2").style.display = "none";
    document.querySelector("#texto_resultado").style.display = "inline-block";
    document.querySelector("#copiar").style.display = "inline-block";
}

function encriptarMensaje() {
    const mensaje = document.querySelector("#texto_usuario").value.trim();
    let secreto = "";

    if (mensaje === "") {
        mostrarMensajeModal("Debe escribir un mensaje para poder encriptarlo");
        return;
    }

    if (!esMensajeValido(mensaje)) {
        mostrarMensajeModal("Debe de ingresar un mensaje en minúsculas y sin acentos");
        return;
    }

    for (let i = 0; i < mensaje.length; i++) {
        switch (mensaje[i]) {
            case "a":
                secreto += "ai";
                break;
            case "e":
                secreto += "enter";
                break;
            case "i":
                secreto += "imes";
                break;
            case "o":
                secreto += "ober";
                break;
            case "u":
                secreto += "ufat";
                break;
            default:
                secreto += mensaje[i];
        }
    }

    actualizarPantalla();
    mostrar(secreto);
    document.querySelector('#texto_usuario').value = '';
}

function desencriptarMensaje() {
    let mensaje = document.querySelector("#texto_usuario").value.trim();
    const codigos = [/ai/g, /enter/g, /imes/g, /ober/g, /ufat/g];
    const letras = ['a', 'e', 'i', 'o', 'u'];

    if (mensaje === "") {
        mostrarMensajeModal("Debe escribir un mensaje para poder decencriptarlo");
        return;
    }

    if (!esMensajeValido(mensaje)) {
        mostrarMensajeModal("Debe de ingresar un mensaje en minúsculas y sin acentos");
        return;
    }

    for (let i = 0; i < codigos.length; i++) {
        mensaje = mensaje.replaceAll(codigos[i], letras[i]);
    }

    actualizarPantalla();
    mostrar(mensaje);
    document.querySelector('#texto_usuario').value = '';
}

function copiarTexto() {
    const texto = document.querySelector("#texto_resultado").textContent;
    navigator.clipboard.writeText(texto).then(() => {
        mostrarMensajeModal("Texto copiado al portapapeles");
    }).catch(err => {
        mostrarMensajeModal("Error al copiar texto: ", err);
    });
}

function esMensajeValido(mensaje) {
    return mensaje !== "" && !/[A-Zá-úÁ-Ú]/.test(mensaje) && mensaje.length > 0;
}
