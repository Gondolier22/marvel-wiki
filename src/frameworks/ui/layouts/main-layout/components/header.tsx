import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoritesCount, openDB } from '../../../../../utils/indexedDB';

// Componente del header que muestra el logo y el contador de favoritos
export const Header = () => {
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    // Función para actualizar el contador de favoritos
    const updateFavCount = async () => {
      const count = await getFavoritesCount();
      setFavCount(count);
    };

    // Abrir la base de datos y actualizar el contador cuando se modifiquen los favoritos
    const db = openDB();
    db.then((dbInstance) => {
      const transaction = dbInstance.transaction('favorites', 'readonly');
      const store = transaction.objectStore('favorites');
      store.openCursor().onsuccess = () => {
        updateFavCount();
      };
    });

    updateFavCount();

    // Agregar un listener para actualizar el contador cuando se modifiquen los favoritos
    const handleFavoritesUpdated = () => {
      updateFavCount();
    };

    document.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      // Eliminar el listener cuando el componente se desmonte
      document.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  return (
    <header className="c-main-layout__header" role="navigation">
      {/* Enlace al inicio */}
      <Link to={'/'} aria-label="Go to character list">
        <img src="/logo.svg" alt="Marvel logo" />
      </Link>

      {/* Enlace a la página de favoritos con el contador */}
      <Link className="c-main-layout__header__counter" to={'/favs'} aria-label="Go to favs page">
        <img src="/fav_on.svg" alt="Favs" />
        <p aria-live="polite">{favCount}</p>
      </Link>
    </header>
  );
};
