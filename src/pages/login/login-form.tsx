import { ChangeEvent, FormEvent, useState } from 'react';
// import { toast } from 'react-toastify';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { login } from '../../store/api-actions';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useTypedDispatch();

  function handleLoginInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setEmail(target.value);
  }

  function handlePasswordInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setPassword(target.value);
  }

  function handleFormSubmit(evt: FormEvent<Element>) {
    evt.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
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

export default LoginForm;
