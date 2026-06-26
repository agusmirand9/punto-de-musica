import { guardarPunto, obtenerPuntos, modificarPunto, eliminarPunto } from './storage.js';
import { obtenerUbicacion, linkGoogleMaps, soportaGeolocalizacion, buscarEnItunes } from './api.js';

//registro
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then((registro) => {
      console.log('Service Worker registrado con éxito', registro);
    })
    .catch((error) => {
      console.error('Error al registrar el Service Worker', error);
    });

} else {
  console.warn('Este navegador no soporta Service Workers');
}

//AVISO DE CONEXION
const avisoOffline = document.querySelector('#avisoOffline');

// el navegador pierde la conexión 
window.addEventListener('offline', () => {
  console.log('Sin conexión');
  avisoOffline.classList.remove('oculto');
});

// el navegador recupera la conexión 
window.addEventListener('online', () => {
  console.log('Conexión recuperada');
  avisoOffline.classList.add('oculto');
});

//si desde que entro a la app no hay conexion, muestra el mnsj
if (!navigator.onLine) {
  avisoOffline.classList.remove('oculto');
}


//ELEMENTOS DEL DOM
//modal
const btnAbrirModal = document.querySelector('#btnAbrirModal');
const btnCerrarModal = document.querySelector('#btnCerrarModal');
const btnCancelar = document.querySelector('#btnCancelar');
const modalPunto = document.querySelector('#modalPunto');
const tituloModal = document.querySelector('#tituloModal');

//formulario
const formPunto = document.querySelector('#formPunto');
const inputId = document.querySelector('#puntoId');
const inputCancion = document.querySelector('#cancion');
const inputArtista = document.querySelector('#artista');
const inputLugarNombre = document.querySelector('#lugarNombre');
const inputNota = document.querySelector('#nota');
const inputLatitud = document.querySelector('#latitud');
const inputLongitud = document.querySelector('#longitud');
const inputCaratula = document.querySelector('#caratula');

//sugerencias de iTunes
const contenedorSugerencias = document.querySelector('#sugerencias');
const previewCaratula = document.querySelector('#previewCaratula');
const imgCaratula = document.querySelector('#imgCaratula');
const textoCaratula = document.querySelector('#textoCaratula');

const listaPuntos = document.querySelector('#listaPuntos');
const estadoVacio = document.querySelector('#estadoVacio');

// geolocali
const btnUbicacion = document.querySelector('#btnUbicacion');
const estadoUbicacion = document.querySelector('#estadoUbicacion');




// Si el navegador no soporta geolocali oculta el botón de ubi 
if (!soportaGeolocalizacion()) {
  btnUbicacion.style.display = 'none';
  estadoUbicacion.textContent = 'Geolocalización no disponible en este navegador';
}


//  boton usar ubi actual

btnUbicacion.addEventListener('click', async () => {
  btnUbicacion.disabled = true;
  btnUbicacion.textContent = 'Obteniendo ubicación...';
  estadoUbicacion.textContent = 'Esperando permiso del navegador...';

  try {
    const { latitud, longitud } = await obtenerUbicacion();

    inputLatitud.value = latitud;
    inputLongitud.value = longitud;

    const url = linkGoogleMaps(latitud, longitud);
    estadoUbicacion.innerHTML = `
      Lat: ${latitud.toFixed(5)}, Long: ${longitud.toFixed(5)}
      — <a href="${url}" target="_blank">Ver en mapa</a>
    `;

    btnUbicacion.textContent = 'Actualizar ubicación';

  } catch (error) {
    
    estadoUbicacion.textContent = `${error.message}`;
    btnUbicacion.textContent = 'Reintentar ubicación';
    inputLatitud.value = '';
    inputLongitud.value = '';
  }

  btnUbicacion.disabled = false;
});


// BÚSQUEDA EN ITUNES (con debounce)
let timerDebounce;

inputCancion.addEventListener('input', () => {
  const termino = inputCancion.value.trim();

  clearTimeout(timerDebounce);

  if (termino.length < 3) {
    contenedorSugerencias.classList.add('oculto');
    contenedorSugerencias.innerHTML = '';
    return;
  }

  timerDebounce = setTimeout(async () => {
    try {
      const resultados = await buscarEnItunes(termino);

      if (resultados.length === 0) {
        contenedorSugerencias.classList.add('oculto');
        return;
      }

      contenedorSugerencias.innerHTML = resultados.map((r, i) => `
        <div class="sugerencia-item" data-index="${i}">
          <img src="${r.caratula}" alt="${r.album}" loading="lazy">
          <div class="sugerencia-item-texto">
            <strong>${r.cancion}</strong>
            <small>${r.artista} · ${r.album}</small>
          </div>
        </div>
      `).join('');

      contenedorSugerencias.classList.remove('oculto');

      contenedorSugerencias.querySelectorAll('.sugerencia-item').forEach((el, i) => {
        el.addEventListener('click', () => {
          const elegida = resultados[i];
          inputCancion.value = elegida.cancion;
          inputArtista.value = elegida.artista;
          inputCaratula.value = elegida.caratula;
          
          imgCaratula.src = elegida.caratula;
          textoCaratula.textContent = `${elegida.cancion} — ${elegida.artista}`;
          previewCaratula.classList.remove('oculto');

          contenedorSugerencias.classList.add('oculto');
          contenedorSugerencias.innerHTML = '';
        });
      });

    } catch (error) {
      console.warn('iTunes no disponible:', error.message);
      contenedorSugerencias.classList.add('oculto');
    }
  }, 400);
});

// Cerrar sugerencias si hay un click afuera 
document.addEventListener('click', (e) => {
  if (!inputCancion.contains(e.target) && !contenedorSugerencias.contains(e.target)) {
    contenedorSugerencias.classList.add('oculto');
  }
});



// ABRIR Y CERRAR EL MODAL
btnAbrirModal.addEventListener('click', () => {
  formPunto.reset();
  inputId.value = '';
  tituloModal.textContent = 'Nuevo punto musical';
  estadoUbicacion.textContent = 'Sin ubicación capturada';
  btnUbicacion.textContent = 'Usar mi ubicación actual';

  previewCaratula.classList.add('oculto');
  imgCaratula.src = '';
  textoCaratula.textContent = '';
  inputCaratula.value = '';

  contenedorSugerencias.classList.add('oculto');
  modalPunto.classList.add('activo');
  inputCancion.focus();
});

btnCerrarModal.addEventListener('click', cerrarModal);
btnCancelar.addEventListener('click', cerrarModal);

function cerrarModal() {
  modalPunto.classList.remove('activo');
  previewCaratula.classList.add('oculto');
  imgCaratula.src = '';
  textoCaratula.textContent = '';
  contenedorSugerencias.classList.add('oculto');
  contenedorSugerencias.innerHTML = '';
}



// CREAR o MODIFICAR 
formPunto.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const punto = {
    id: inputId.value ? Number(inputId.value) : Date.now(),
    cancion: inputCancion.value.trim(),
    artista: inputArtista.value.trim(),
    lugarNombre: inputLugarNombre.value.trim(),
    nota: inputNota.value.trim(),
    latitud: inputLatitud.value ? Number(inputLatitud.value) : null,
    longitud: inputLongitud.value ? Number(inputLongitud.value) : null,
    caratula: inputCaratula.value || null,
    fecha: new Date().toISOString()
  };

  try {
    if (inputId.value) {
      await modificarPunto(punto);
      console.log('Punto modificado', punto);

    } else {
      await guardarPunto(punto);
      console.log('Punto guardado', punto);
    }

    await renderizarPuntos();
    cerrarModal();

  } catch (error) {
    console.error('Error al guardar el punto', error);
    alert('Hubo un problema al guardar. intenta nuevamente.');
  }
});


// Llos puntos guardados
async function renderizarPuntos() {
  const puntos = await obtenerPuntos();

  listaPuntos.innerHTML = '';
  estadoVacio.style.display = puntos.length === 0 ? 'block' : 'none';

  puntos.forEach((punto) => {
    const li = document.createElement('li');
    li.classList.add('tarjeta-punto');

    li.innerHTML = `
      ${punto.caratula
        ? `<img class="tarjeta-caratula" 
              src="${punto.caratula}" 
              alt="${punto.cancion}"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
            >
            <div class="tarjeta-caratula-placeholder" style="display:none">🎵</div>`
        : '<div class="tarjeta-caratula-placeholder">🎵</div>'
      }
      <div class="tarjeta-punto-info">
        <strong>${punto.cancion} — ${punto.artista}</strong>
        <small>${punto.lugarNombre || 'Sin nombre de lugar'}${punto.nota ? ' · ' + punto.nota : ''}</small>
        ${punto.latitud && punto.longitud
          ? `<small>📍 <a href="${linkGoogleMaps(punto.latitud, punto.longitud)}" target="_blank">
              Ver en mapa (${punto.latitud.toFixed(4)}, ${punto.longitud.toFixed(4)})
             </a></small>`
          : '<small>Sin ubicación guardada</small>'
        }
      </div>
      <div class="tarjeta-punto-acciones">
        <button class="btn-editar" title="Editar">✏️</button>
        <button class="btn-eliminar" title="Eliminar">🗑️</button>
      </div>
    `;

    li.querySelector('.btn-editar').addEventListener('click', () => abrirModalEdicion(punto));
    li.querySelector('.btn-eliminar').addEventListener('click', () => confirmarEliminar(punto));

    listaPuntos.appendChild(li);
  });
}


// MODIFICAR, abrir el modal con los datos ya cargados

function abrirModalEdicion(punto) {
  tituloModal.textContent = 'Editar punto musical';
  inputId.value = punto.id;
  inputCancion.value = punto.cancion;
  inputArtista.value = punto.artista;
  inputLugarNombre.value = punto.lugarNombre || '';
  inputNota.value = punto.nota || '';
  inputLatitud.value = punto.latitud ?? '';
  inputLongitud.value = punto.longitud ?? '';
  inputCaratula.value = punto.caratula || '';

  // muestra el preview si hay
  if (punto.caratula) {
    imgCaratula.src = punto.caratula;
    textoCaratula.textContent = `${punto.cancion} — ${punto.artista}`;
    previewCaratula.classList.remove('oculto');
  } else {
    previewCaratula.classList.add('oculto');
  }

  contenedorSugerencias.classList.add('oculto');
  modalPunto.classList.add('activo');
}

// MODAL DE CONFIRMACIÓN PARA ELIMINAR

const modalEliminar = document.querySelector('#modalEliminar');
const btnConfirmarEliminar = document.querySelector('#btnConfirmarEliminar');
const btnCancelarEliminar = document.querySelector('#btnCancelarEliminar');
const textoEliminar = document.querySelector('#textoEliminar');

let puntoAEliminar = null;

btnCancelarEliminar.addEventListener('click', () => {
  modalEliminar.classList.remove('activo');
  puntoAEliminar = null;
});

modalEliminar.addEventListener('click', (e) => {
  if (e.target === modalEliminar) {
    modalEliminar.classList.remove('activo');
    puntoAEliminar = null;
  }
});

btnConfirmarEliminar.addEventListener('click', async () => {
  if (!puntoAEliminar) return;
  modalEliminar.classList.remove('activo');
  try {
    await eliminarPunto(puntoAEliminar.id);
    console.log('Punto eliminado', puntoAEliminar.id);
    puntoAEliminar = null;
    await renderizarPuntos();
  } catch (error) {
    console.error('Error al eliminar el punto', error);
  }
});

function confirmarEliminar(punto) {
  puntoAEliminar = punto;
  textoEliminar.textContent = `¿Seguro que querés eliminar "${punto.cancion}"? Esta acción no se puede deshacer.`;
  modalEliminar.classList.add('activo');
}


renderizarPuntos();