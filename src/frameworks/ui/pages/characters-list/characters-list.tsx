import { CharacterCard } from './components/character-card';
import { Searcher } from './components/searcher';
import { useCharacterListController } from './hooks/use-characters-list-controller';

const CharactersList = () => {
  const { data, error, isLoading, searchText, setSearchText } = useCharacterListController();

  return (
    <section className="c-characters-list">
      <Searcher onChange={setSearchText} value={searchText} />
      <div className="c-characters-list__container">
        {data?.map((character) => (
          <div key={character.id}>
            <CharacterCard
              avatarUrl={character.avatarUrl}
              name={character.name}
              id={character.id}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CharactersList;
