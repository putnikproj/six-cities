import { Link } from 'react-router-dom';
import { AppRoute } from '../../helpers/const';
import Header from '../../components/header/header';

function NotFound(): JSX.Element {
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

export default NotFound;
