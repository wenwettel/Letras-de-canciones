// Importar Modulos
import {API} from './api.js';
import * as UI from './interfaz.js'; 


UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    // es recomendable no mandar los datos dinamicos al export, sino declalarlos directamente en la accion
    // Obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;
    if(artista === '' || cancion === '') {
        // El usuario deja los campos vacios mostrar error
        UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
        UI.divMensajes.classList.add('error');
        setTimeout (() => {
            UI.divMensajes.innerHTML ='';
            UI.divMensajes.classList.remove('error');
        },3000);
    } else {
        // el formulario esta completo, consultar la API
        const api = new API(artista, cancion);
        api.consultarAPI()
         .then(data => {
                if(data.respuesta.lyrics) {
                    // La cancion existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                    
                }else {
                 // La cancion no existe
                UI.divMensajes.innerHTML = 'Ingrese el nombre del Artista y la Cancion correctamente';
                UI.divMensajes.classList.add('error');
                setTimeout (() => {
                    UI.divMensajes.innerHTML ='';
                    UI.divMensajes.classList.remove('error');
                   
                },4000);
                    
                }
                
         });
    }

})
