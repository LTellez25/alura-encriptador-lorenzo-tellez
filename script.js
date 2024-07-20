document.addEventListener('DOMContentLoaded', function () {
    let encriptar = document.querySelector("#encriptar");
    let desencriptar = document.querySelector("#desencriptar");
    let copiar = document.querySelector("#copiar");

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
    let modal = document.getElementById("modal");
    let span = document.getElementsByClassName("close")[0];
    let modalMessage = document.getElementById("modal-message");

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
    let mensaje = document.querySelector("#texto_usuario").value.trim();
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
    let codigos = [/ai/g, /enter/g, /imes/g, /ober/g, /ufat/g];
    let letras = ['a', 'e', 'i', 'o', 'u'];

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
    let texto = document.querySelector("#texto_resultado").textContent;
    navigator.clipboard.writeText(texto).then(() => {
        mostrarMensajeModal("Texto copiado al portapapeles");
    }).catch(err => {
        mostrarMensajeModal("Error al copiar texto: ", err);
    });
}

function esMensajeValido(mensaje) {
    return mensaje !== "" && !/[A-Zá-úÁ-Ú]/.test(mensaje) && mensaje.length > 0;
}


let inicioTour = () => {
    let driver = window.driver.js.driver;

    let driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#texto_usuario', popover: { title: 'Campo de Texto', description: 'Escribe aquí el texto que deseas encriptar o desencriptar.' } },
          { element: '#encriptar', popover: { title: 'Botón Encriptar', description: 'Presiona este botón para encriptar el texto que escribiste.', } },
          { element: '#desencriptar', popover: { title: 'Botón Desencriptar', description: 'Presiona este botón para desencriptar el texto que escribiste.' } },
          { element: '#resultado_mensaje', popover: { title: 'Resultado del Texto', description: 'Aquí se mostrará el resultado del texto encriptado o desencriptado.' } },
          { popover: { title: '¡Enhorabuena!', description: 'Has completado el recorrido. Ahora estás listo para encriptar y desencriptar tus mensajes con facilidad. ¡Empieza a explorar y personalizar tu experiencia!' } }
        ],
        doneBtnText: 'Hecho', // Cambia el texto del botón "Done"
        nextBtnText: 'Siguiente', // Cambia el texto del botón "Next"
        prevBtnText: 'Anterior', // Cambia el texto del botón "Previous"
        closeBtnText: 'Cerrar' // Cambia el texto del botón "Close"
    });

    

    driverObj.drive();
}

document.querySelector("#btn-help").addEventListener("click", () => {
    inicioTour()
})

document.addEventListener('DOMContentLoaded', function() {

    let swictherTheme = document.querySelector('.main__check');
    let root = document.documentElement;

    if(root.getAttribute('data-theme') === 'dark'){
      swictherTheme.checked = true;      
    } 

    function toggleTheme(){
        
        let setTheme = this.checked ? 'dark' : 'light';
        root.setAttribute('data-theme', setTheme);
    
        localStorage.setItem('theme', setTheme);
    }
    

    swictherTheme.addEventListener('click', toggleTheme);

});