import { toast } from 'react-toastify';

import { AppThunk, RootState } from '..';
import { api, handleAPIError } from '../../helpers/api';
import { clearAuthToken, setAuthToken } from '../../helpers/auth-token';
import { AuthStatus, ResponseCodes, ServerRoutes } from '../../helpers/enum';
import { AuthUser, AuthUserWithToken, UserLogin } from '../../types';

// State

type UserState = {
  authStatus: AuthStatus;
  authUser: AuthUser | null;
};

const initialState: UserState = {
  authStatus: AuthStatus.IDLE,
  authUser: null,
};

// Reducer

enum ActionType {
  AUTH_LOADING = 'user/authLoading',
  AUTH_LOADING_FAILED = 'user/authLoadingFailed',
  USER_AUTHORIZED = 'user/userUnauthorized',
  USER_UNAUTHORIZED = 'user/userAuthorized',
  LOGOUT_FAILED = 'user/logoutFailed',
}

export default function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case ActionType.AUTH_LOADING:
      return { ...state, authStatus: AuthStatus.LOADING };
    case ActionType.AUTH_LOADING_FAILED:
      return { ...state, authStatus: AuthStatus.UNKNOWN };
    case ActionType.USER_AUTHORIZED:
      return { ...state, authStatus: AuthStatus.AUTH, authUser: action.payload };
    case ActionType.USER_UNAUTHORIZED:
      return { ...state, authStatus: AuthStatus.UNAUTH, authUser: null };
    case ActionType.LOGOUT_FAILED:
      return { ...state, authStatus: AuthStatus.AUTH };
    default:
      return state;
  }
}

// Actions

export const authLoading = () => ({ type: ActionType.AUTH_LOADING } as const);
export const authLoadingFailed = () => ({ type: ActionType.AUTH_LOADING_FAILED } as const);

export const userAuthorized = (authUser: UserState['authUser']) =>
  ({ type: ActionType.USER_AUTHORIZED, payload: authUser } as const);

export const userUnauthorized = () => ({ type: ActionType.USER_UNAUTHORIZED } as const);
export const logoutFailed = () => ({ type: ActionType.LOGOUT_FAILED } as const);

type UserActions =
  | ReturnType<typeof authLoading>
  | ReturnType<typeof authLoadingFailed>
  | ReturnType<typeof userAuthorized>
  | ReturnType<typeof userUnauthorized>
  | ReturnType<typeof logoutFailed>;

// Async actions

export function checkAuth(): AppThunk {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const {
        data: { token, ...authUser },
      } = await api.get<AuthUserWithToken>(ServerRoutes.LOGIN);
      dispatch(userAuthorized(authUser));
    } catch (err) {
      handleAPIError(err, (axiosError) => {
        switch (axiosError.response?.status) {
          case ResponseCodes.UNAUTHORIZED:
            dispatch(userUnauthorized());
            toast.warn('You are not authorised');
            return;
          default:
            dispatch(authLoadingFailed());
            toast.error(axiosError.message);
        }
      });
    }
  };
}

const SUCCESS_LOGIN_MESSAGE = 'You have successfully logged in';

export function login({ email, password }: UserLogin): AppThunk {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const {
        data: { token, ...authUser },
      } = await api.post<AuthUserWithToken>(ServerRoutes.LOGIN, { email, password });

      setAuthToken(token);
      dispatch(userAuthorized(authUser));
      toast.success(SUCCESS_LOGIN_MESSAGE);
    } catch (err) {
      dispatch(authLoadingFailed());
      handleAPIError(err);
    }
  };
}

const SUCCESS_LOGOUT_TEXT = 'You have successfully logged out';

export function logout(): AppThunk {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      await api.delete(ServerRoutes.LOGOUT);

      clearAuthToken();
      dispatch(userUnauthorized());
      toast.success(SUCCESS_LOGOUT_TEXT);
    } catch (err) {
      dispatch(logoutFailed());
      handleAPIError(err);
    }
  };
}

// Selectors

export const authStatusSelector = (state: RootState) => state.user.authStatus;
export const authUserSelector = (state: RootState) => state.user.authUser;
