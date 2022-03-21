import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../header/header';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header />
      <h1>404. Page not found</h1>
      <Link to={AppRoute.ROOT}>Go to main page</Link>
    </>
  );
}

export default NotFoundPage;
