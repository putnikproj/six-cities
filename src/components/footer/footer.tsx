import { Link } from 'react-router-dom';

import { AppRoute } from '../../helpers/enum';

function Footer() {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.ROOT}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
}

export default Footer;
