function actualizarPantalla(){
    
    document.querySelector("#resultado").style.display="none";
    document.querySelector("#muñeco").style.display="none";
    document.querySelector("#mensaje_inicial").style.display="none";
    document.querySelector("#mensaje_inicial_2").style.display="none";
    document.querySelector("#texto_resultado").style.display="inline-block";
    document.querySelector("#copiar").style.display="inline-block";
    

}

function encriptarMensaje() {
    let mensaje = document.querySelector("#texto_usuario").value.trim();
    let secreto = "";

    if (esMensajeValido(mensaje)) {
        secreto = encriptar(mensaje);
        actualizarPantalla();
        mostrar(secreto);
        document.querySelector('#texto_usuario').value = '';
    } else {
        alert("Por favor, ingrese un mensaje en minúsculas y sin acentos");
    }
}

function esMensajeValido(mensaje) {
    return mensaje !== "" && !/[A-Zá-úÁ-Ú]/.test(mensaje) && mensaje.length > 0;
}

function encriptar(mensaje) {
    let resultado = "";
    for (let i = 0; i < mensaje.length; i++) {
        switch (mensaje[i]) {
            case "a":
                resultado += "ai";
                break;
            case "e":
                resultado += "enter";
                break;
            case "i":
                resultado += "imes";
                break;
            case "o":
                resultado += "ober";
                break;
            case "u":
                resultado += "ufat";
                break;
            default:
                resultado += mensaje[i];
        }
    }
    return resultado;
}

