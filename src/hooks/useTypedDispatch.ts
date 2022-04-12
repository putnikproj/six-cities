import { useDispatch } from 'react-redux';

import { AppDispatch } from '../types/store';

// https://react-redux.js.org/using-react-redux/usage-with-typescript
export const useTypedDispatch = () => useDispatch<AppDispatch>();
