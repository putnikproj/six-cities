import { toast } from 'react-toastify';

import { AppThunk } from '..';
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
  authStatus: AuthStatus.UNKNOWN,
  authUser: null,
};

// Reducer

enum ActionType {
  SET_AUTH_STATUS = 'user/setAuthStatus',
  SET_AUTH_USER = 'user/setAuthUser',
}

export default function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return { ...state, authStatus: action.payload.authStatus };
    case ActionType.SET_AUTH_USER:
      return { ...state, authUser: action.payload.authUser };
    default:
      return state;
  }
}

// Actions

export const setAuthStatus = (authStatus: UserState['authStatus']) =>
  ({
    type: ActionType.SET_AUTH_STATUS,
    payload: { authStatus },
  } as const);

export const setAuthUser = (authUser: UserState['authUser']) =>
  ({
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  } as const);

type UserActions = ReturnType<typeof setAuthStatus> | ReturnType<typeof setAuthUser>;

// Async actions

export function checkAuth(): AppThunk {
  return async (dispatch) => {
    try {
      const {
        data: { token, ...authUser },
      } = await api.get<AuthUserWithToken>(ServerRoutes.LOGIN);

      dispatch(setAuthStatus(AuthStatus.AUTH));
      dispatch(setAuthUser(authUser));
    } catch (err) {
      dispatch(setAuthStatus(AuthStatus.UNAUTH));
      handleAPIError(err, (axiosError) => {
        switch (axiosError.response?.status) {
          case ResponseCodes.UNAUTHORIZED:
            toast.warn('You are not authorised');
            return;
          default:
            toast.error(axiosError.message);
        }
      });
    }
  };
}

export function login({ email, password }: UserLogin): AppThunk {
  return async (dispatch) => {
    const {
      data: { token, ...authUser },
    } = await api.post<AuthUserWithToken>(ServerRoutes.LOGIN, { email, password });

    setAuthToken(token);
    dispatch(setAuthStatus(AuthStatus.AUTH));
    dispatch(setAuthUser(authUser));
  };
}

export function logout(): AppThunk {
  return async (dispatch) => {
    await api.delete(ServerRoutes.LOGOUT);

    clearAuthToken();
    dispatch(setAuthStatus(AuthStatus.UNAUTH));
    dispatch(setAuthUser(null));
  };
}

// Selectors
