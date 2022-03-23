import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../header/header';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header />
      <div className="container">
        <h1>404. Page not found</h1>
        <Link to={AppRoute.ROOT}>Go to main page</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
