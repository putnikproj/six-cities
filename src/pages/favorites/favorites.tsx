import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesPlaceList from '../../components/favorites-place-list/favorites-place-list';

function Favorites(): JSX.Element {
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesPlaceList />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;
