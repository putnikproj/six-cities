import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useTypedDispatch } from '../../hooks';
import { login } from '../../store/api-actions';

const SUCCESS_LOGIN_MESSAGE = 'You have successfully logged in';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();

  function handleLoginInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setEmail(target.value);
  }

  function handlePasswordInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setPassword(target.value);
  }

  async function handleFormSubmit(evt: FormEvent<Element>) {
    evt.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(login({ email, password }));
      toast.success(SUCCESS_LOGIN_MESSAGE);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.message);
      }
    }
    // Then AuthStatus changes, login rerenders and redirects to necessary page
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>
      <button className="login__submit form__submit button" type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign in'}
      </button>
    </form>
  );
}

export default LoginForm;
