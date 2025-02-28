import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoritesCount, openDB } from '../../../../../utils/indexedDB';

export const Header = () => {
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const updateFavCount = async () => {
      const count = await getFavoritesCount();
      setFavCount(count);
    };

    const db = openDB();
    db.then((dbInstance) => {
      const transaction = dbInstance.transaction('favorites', 'readonly');
      const store = transaction.objectStore('favorites');
      store.openCursor().onsuccess = () => {
        updateFavCount();
      };
    });

    updateFavCount();

    const handleFavoritesUpdated = () => {
      updateFavCount();
    };

    document.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      document.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  return (
    <header className="c-main-layout__header" role="navigation">
      <Link to={'/'} aria-label="Go to character list">
        <img src="/logo.svg" alt="Marvel logo" />
      </Link>

      <Link className="c-main-layout__header__counter" to={'/favs'} aria-label="Go to favs page">
        <img src="/fav_on.svg" alt="Favs" />
        <p aria-live="polite">{favCount}</p>
      </Link>
    </header>
  );
};
