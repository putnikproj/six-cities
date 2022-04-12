import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../types/store';

// https://react-redux.js.org/using-react-redux/usage-with-typescript
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
