import { CharacterCardList } from '../../components/characters-cards-list';
import { Searcher } from '../../components/searcher';
import { useFavouritesController } from './hooks/use-favourites-controller';

const Favourites = () => {
  const { favourites, search, setSearch } = useFavouritesController();

  return (
    <section className="c-characters-list">
      <Searcher onChange={setSearch} value={search} totalResults={favourites.length} />
      <CharacterCardList cards={favourites} />
    </section>
  );
};

export default Favourites;
