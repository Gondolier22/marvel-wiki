import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <header className="c-main-layout__header" role="navigation">
      <Link to={'/'} aria-label="Go to character list">
        <img src="/logo.svg" alt="Marvel logo" />
      </Link>

      <Link className="c-main-layout__header__counter" to={'/favs'} aria-label="Go to favs page">
        <img src="/fav_on.svg" alt="Favs" />
        <p aria-live="polite">4</p> {/*TODO: This should be dynamic */}
      </Link>
    </header>
  );
};
