import { bindActionCreators } from 'redux';

import { useTypedDispatch } from './useTypedDispatch';
import * as actionCreators from '../store/action';

export const useActions = () => {
  const dispatch = useTypedDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
