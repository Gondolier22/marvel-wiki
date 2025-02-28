import { CharacterCard } from './components/character-card';
import { Searcher } from './components/searcher';
import { useCharacterListController } from './hooks/use-characters-list-controller';

const CharactersList = () => {
  const { data, searchText, setSearchText } = useCharacterListController();

  return (
    <section className="c-characters-list">
      <Searcher onChange={setSearchText} value={searchText} totalResults={data?.length ?? 0} />
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
