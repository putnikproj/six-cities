import { Link } from 'react-router-dom';
import { AppRoute } from '../../helpers/enum';
import Header from '../../components/header';

function NotFound(): JSX.Element {
  return (
    <div className="page">
      <Header />
      <div className="container">
        <h1>404. Page not found</h1>
        <Link to={AppRoute.ROOT}>Go to main page</Link>
      </div>
    </div>
  );
}

export default NotFound;
