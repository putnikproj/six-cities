import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.ROOT}>Go to main page</Link>
    </>
  );
}

export default NotFoundPage;
