import { CharacterCardList } from '../../components/characters-cards-list';
import { Searcher } from '../../components/searcher';
import { useFavouritesController } from './hooks/use-favourites-controller';

// Componente para mostrar la lista de personajes favoritos
const Favourites = () => {
  const { favourites, search, setSearch } = useFavouritesController();

  return (
    <section className="c-characters-list">
      {/* Componente de búsqueda */}
      <Searcher onChange={setSearch} value={search} totalResults={favourites.length} />
      {/* Componente para mostrar la lista de tarjetas de personajes */}
      <CharacterCardList cards={favourites} />
    </section>
  );
};

export default Favourites;
