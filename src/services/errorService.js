export function ErrorManagement(code){

    let message = ''

    switch (code) {
        case 404:
            message = 'Ruta no valida'
            break;

        case 429:
            message = 'Demasiadas solicitudes, intente mas tarde'
            break;
    
        case 500:
            message = 'Error en la server'
            break;

        default: message = 'Error al procesar la solicitud';
            break;
    }

    return message
}