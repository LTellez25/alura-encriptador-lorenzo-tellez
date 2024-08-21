document.addEventListener('DOMContentLoaded', function () {
    let encriptar = document.querySelector("#encriptar");
    let desencriptar = document.querySelector("#desencriptar");
    let copiar = document.querySelector("#copiar");

    encriptar.onclick = encriptarMensaje;
    desencriptar.onclick = desencriptarMensaje;
    copiar.onclick = copiarTexto;

    setTimeout(() => {
        document.getElementById('preloader_4').style.display = 'none';
        document.body.classList.remove('preload');
        document.querySelector('.principal').style.display = 'block';
    }, 2500);
});

function mostrarMensajeModal(mensaje) {
    let modal = document.getElementById("modal");
    let cerrar = document.getElementsByClassName("close")[0];
    let modalMensaje = document.getElementById("modal-message");

    modalMensaje.textContent = mensaje;
    modal.style.display = "block";

    cerrar.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(evento) {
        if (evento.target == modal) {
            modal.style.display = "none";
        }
    }
}

function mostrar(mensaje) {
    document.querySelector("#texto_resultado").textContent = mensaje;
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
        mostrarMensajeModal("El mensaje solo puede contener letras minusculas sin acentos ni caracteres especiales");
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
        mostrarMensajeModal("Debe escribir un mensaje para poder desencriptarlo");
        return;
    }

    if (!esMensajeValido(mensaje)) {
        mostrarMensajeModal("El mensaje solo puede contener letras minusculas sin acentos ni caracteres especiales");
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
    }).catch(error => {
        mostrarMensajeModal("Error al copiar texto: " + error);
    });
}

function esMensajeValido(mensaje) {
    return /^[a-z 0-9]+$/.test(mensaje);
}

let inicioTour = () => {
    let driver = window.driver.js.driver;

    let driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#texto_usuario', popover: { title: 'Campo de Texto', description: 'Escribe aqui el texto que deseas encriptar o desencriptar.' } },
          { element: '#encriptar', popover: { title: 'Boton Encriptar', description: 'Presiona este boton para encriptar el texto que escribiste.', } },
          { element: '#desencriptar', popover: { title: 'Boton Desencriptar', description: 'Presiona este boton para desencriptar el texto que escribiste. Recuerda que debes ingresar un texto ya encriptado!' } },
          { element: '#resultado', popover: { title: 'Resultado del Texto', description: 'Aqui se mostrara el resultado del texto encriptado o desencriptado.' } },
          { popover: { title: 'Enhorabuena!', description: 'Has completado el recorrido. Ahora estas listo para encriptar y desencriptar tus textos con facilidad. Recuerda que debes ingresar textos en minusculas y sin acentos!' } }
        ],
        doneBtnText: 'Hecho',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Anterior',
        closeBtnText: 'Cerrar'
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
