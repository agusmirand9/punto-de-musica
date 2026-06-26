// API - Geolocalización


export function soportaGeolocalizacion() {
  return 'geolocation' in navigator;
}

// OBTENER UBICACIÓN ACTUAL
export function obtenerUbicacion() {
  return new Promise((resolve, reject) => {

    if (!soportaGeolocalizacion()) {
      reject(new Error('Tu navegador no soporta geolocalización'));
      return;
    }

    const opciones = {
      enableHighAccuracy: true,  
      timeout: 20000,           
      maximumAge: 60000       
    };
    //exito
    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        const coordenadas = {
          latitud: posicion.coords.latitude,
          longitud: posicion.coords.longitude 
        };
        console.log('Ubicación obtenida:', coordenadas);
        resolve(coordenadas);
      },

      // error
      (error) => {
        let mensaje;
        switch (error.code) {
          case 1:
            mensaje = 'Permiso de ubicación denegado por el usuario';
            break;
          case 2:
            mensaje = 'No se pudo obtener la ubicación del dispositivo';
            break;
          case 3:
            mensaje = 'Se agotó el tiempo de espera para obtener la ubicación';
            break;
          default:
            mensaje = 'Error desconocido al obtener la ubicación';
        }
        console.warn('Geolocalización:', mensaje);
        reject(new Error(mensaje));
      },

      opciones
    );
  });
}

//BÚSQUEDA EN ITUNES

export async function buscarEnItunes(termino) {
  const terminoCodificado = encodeURIComponent(termino);
  const url = `https://itunes.apple.com/search?term=${terminoCodificado}&entity=song&limit=6&country=AR`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error('Error al buscar en iTunes');
  }
  const datos = await respuesta.json();

  return datos.results.map((item) => ({
    cancion: item.trackName,
    artista: item.artistName,
    album: item.collectionName,
    caratula: item.artworkUrl100.replace('100x100', '300x300')
  }));
}

export function linkGoogleMaps(latitud, longitud) {
  return `https://www.google.com/maps?q=${latitud},${longitud}`;
}