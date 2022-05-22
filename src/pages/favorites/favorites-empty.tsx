import { APIError } from '../../helpers/api';

type FavoritesEmptyProps = {
  error?: APIError;
};

function FavoritesEmpty({ error }: FavoritesEmptyProps) {
  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">{error ? 'Favorites (error)' : 'Favorites (empty)'}</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">{error ? 'Error' : 'Nothing yet saved.'}</b>
        <p className="favorites__status-description">
          {error
            ? error.message
            : 'Save properties to narrow down search or plan your future trips.'}
        </p>
      </div>
    </section>
  );
}

export default FavoritesEmpty;
