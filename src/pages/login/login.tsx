import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/header';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLoginInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setEmail(target.value);
  }

  function handlePasswordInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setPassword(target.value);
  }

  return (
    <form className="login__form form" action="#" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          value={email}
          onChange={handleLoginInputChange}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          value={password}
          onChange={handlePasswordInputChange}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
}

function Login(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
