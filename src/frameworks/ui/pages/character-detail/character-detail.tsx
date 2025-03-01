import classNames from 'classnames';
import { ComicCard } from './components/comic-card';
import { useCharacterDetailController } from './hooks/use-character-detail-controller';
import { Loader } from '../../components/loader';
import { FavButton } from '../../components/fav-button';
import { AlertMessage } from '../../components/alert-message';

const CharacterDetail = () => {
  const {
    detail,
    comics,
    containerRef,
    isLoading,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    error,
  } = useCharacterDetailController();

  if (isLoading) return <Loader />;

  return (
    <section className="c-character">
      {error ? (
        <AlertMessage
          message="An error occurred with the query, please retry refreshing the page"
          type="error"
        />
      ) : (
        <>
          <div className="c-character-detail">
            <img
              className="c-character-detail__image"
              src={detail?.avatarUrl}
              alt={`Avatar of ${detail?.name}`}
            />
            <div className="c-character-detail__info">
              <h1 className="c-character-detail__name">
                <span>{detail?.name}</span>
                <FavButton character={detail} />
              </h1>
              <p className="c-character-detail__description">{detail?.description}</p>
            </div>
          </div>
          {comics && comics.length > 0 ? (
            <div className="c-character-detail__comics">
              <h2>Comics</h2>
              <div
                className={classNames(
                  'c-character-detail__comics-container c-character-detail__comics-container--grabbing'
                )}
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {comics.map((comic) => (
                  <ComicCard key={comic.id} {...comic} />
                ))}
              </div>
            </div>
          ) : (
            <AlertMessage message="No comics found" type="info" />
          )}
        </>
      )}
    </section>
  );
};

export default CharacterDetail;
