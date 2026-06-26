// STORAGE  IndexedDB
const DB_NAME = 'PuntoMusicaDB';
const DB_VERSION = 1;
const STORE_NAME = 'puntos';


// abrir ala base de datos
function abrirDB() {
  return new Promise((resolve, reject) => {
    const peticion = indexedDB.open(DB_NAME, DB_VERSION);

    peticion.addEventListener('upgradeneeded', (evento) => {
      const db = evento.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        console.log('Object Store "puntos" creado');
      }
    });

    peticion.addEventListener('success', () => {
      resolve(peticion.result);
    });

    peticion.addEventListener('error', () => {
      reject(peticion.error);
    });
  });
}

// CREAR,guardar un punto nuevo
export async function guardarPunto(punto) {
  const db = await abrirDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const peticion = store.add(punto);

    peticion.addEventListener('success', () => resolve(punto));
    peticion.addEventListener('error', () => reject(peticion.error));
  });
}

//  los puntos guardados

export async function obtenerPuntos() {
  const db = await abrirDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const peticion = store.getAll();

    peticion.addEventListener('success', () => resolve(peticion.result));
    peticion.addEventListener('error', () => reject(peticion.error));
  });
}


// MODIFICAR, editar un punto existente
export async function modificarPunto(punto) {
  const db = await abrirDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const peticion = store.put(punto);

    peticion.addEventListener('success', () => resolve(punto));
    peticion.addEventListener('error', () => reject(peticion.error));
  });
}


// ELIMINAR, borrar un punto
export async function eliminarPunto(id) {
  const db = await abrirDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const peticion = store.delete(id);

    peticion.addEventListener('success', () => resolve());
    peticion.addEventListener('error', () => reject(peticion.error));
  });
}