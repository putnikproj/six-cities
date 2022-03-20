import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <h1>404. Page not found</h1>
      <Link to="/">Go to main page</Link>
    </>
  );
}

export default NotFoundPage;
