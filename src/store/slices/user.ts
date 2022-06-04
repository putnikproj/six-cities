import { toast } from 'react-toastify';

import { AppThunk, RootState } from '..';
import { api, APIError, serializeAPIError } from '../../helpers/api';
import { clearAuthToken, setAuthToken } from '../../helpers/auth-token';
import { AuthStatus, ResponseCodes, ServerRoutes } from '../../helpers/enum';
import { AuthUser, AuthUserWithToken, UserLogin } from '../../types';

const isUnathorizedError = (error: APIError) =>
  error.response?.status === ResponseCodes.UNAUTHORIZED;

enum Message {
  SUCCESS_LOGIN = 'You have successfully logged in',
  SUCCESS_LOGOUT = 'You have successfully logged out',
  UNAUTHORIZED = 'You are not authorised',
}

// State

type UserState = {
  authStatus: AuthStatus;
  authUser: AuthUser | null;
};

const initialState: UserState = {
  authStatus: AuthStatus.LOADING,
  authUser: null,
};

// Reducer

enum ActionType {
  AUTH_LOADING = 'user/authLoading',
  USER_AUTHORIZED = 'user/authorized',
  USER_UNAUTHORIZED = 'user/unauthorized',
  LOGOUT_FAILED = 'user/logoutFailed',
}

export default function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case ActionType.AUTH_LOADING:
      return { ...state, authStatus: AuthStatus.LOADING };
    case ActionType.USER_AUTHORIZED:
      return { ...state, authStatus: AuthStatus.AUTH, authUser: action.payload };
    case ActionType.USER_UNAUTHORIZED:
      return { ...state, authStatus: AuthStatus.UNAUTH };
    case ActionType.LOGOUT_FAILED:
      return { ...state, authStatus: AuthStatus.AUTH };
    default:
      return state;
  }
}

// Actions

export const authLoading = () => ({ type: ActionType.AUTH_LOADING } as const);

export const userAuthorized = (authUser: UserState['authUser']) =>
  ({ type: ActionType.USER_AUTHORIZED, payload: authUser } as const);
export const userUnauthorized = () => ({ type: ActionType.USER_UNAUTHORIZED } as const);

export const logoutFailed = () => ({ type: ActionType.LOGOUT_FAILED } as const);

type UserActions =
  | ReturnType<typeof authLoading>
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
    } catch (error) {
      const serializedError = serializeAPIError(error);

      if (isUnathorizedError(serializedError)) {
        toast.warn(Message.UNAUTHORIZED);
      } else {
        toast.error(`Can't check auth. ${serializedError.message}`);
      }

      dispatch(userUnauthorized());
    }
  };
}

export function login({ email, password }: UserLogin): AppThunk {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const {
        data: { token, ...authUser },
      } = await api.post<AuthUserWithToken>(ServerRoutes.LOGIN, { email, password });

      setAuthToken(token);
      dispatch(userAuthorized(authUser));
      toast.success(Message.SUCCESS_LOGIN);
    } catch (error) {
      dispatch(userUnauthorized());
      toast.error(`Login failed. ${serializeAPIError(error).message}`);
    }
  };
}

export function logout(): AppThunk {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      await api.delete(ServerRoutes.LOGOUT);

      clearAuthToken();
      dispatch(userUnauthorized());
      toast.success(Message.SUCCESS_LOGOUT);
    } catch (error) {
      dispatch(logoutFailed());
      toast.error(`Logout failed. ${serializeAPIError(error).message}`);
    }
  };
}

// Selectors

export const authStatusSelector = (state: RootState) => state.user.authStatus;
export const authUserSelector = (state: RootState) => state.user.authUser;
