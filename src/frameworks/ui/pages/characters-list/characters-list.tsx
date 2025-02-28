import { Loader } from '../../components/loader';
import { Searcher } from '../../components/searcher';
import { useCharacterListController } from './hooks/use-characters-list-controller';
import { CharacterCardList } from '../../components/characters-cards-list';

const CharactersList = () => {
  const { data, searchText, setSearchText, isLoading } = useCharacterListController();

  return (
    <section className="c-characters-list">
      {isLoading && <Loader />}
      <Searcher onChange={setSearchText} value={searchText} totalResults={data?.length ?? 0} />
      {!isLoading && (
        <CharacterCardList
          cards={data?.map(({ id, name, avatarUrl }) => ({ id, name, avatarUrl })) ?? []}
        />
      )}
    </section>
  );
};

export default CharactersList;
