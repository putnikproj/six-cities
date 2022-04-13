import Header from '../../components/header';
import Footer from '../../components/footer';
import FavoritesPlaceList from '../../components/favorites-place-list';

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
