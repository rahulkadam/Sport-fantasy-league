import {useDispatch} from 'react-redux';
import {fetchRandomNumberAPI} from './random-api';
import {
  GET_RANDOM_NUMBER,
  GET_RANDOM_NUMBER_PENDING,
  GET_RANDOM_NUMBER_REJECTED,
} from './randomConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

const fetchRandomNumberAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, GET_RANDOM_NUMBER_PENDING),
    () => {
      fetchRandomNumberAPI()
        .then(data => {
          dispatch({
            type: GET_RANDOM_NUMBER,
            payload: data,
          });
        })
        .catch(error => {
          dispatch({
            type: GET_RANDOM_NUMBER_REJECTED,
            payload: error.message,
          });
        });
    }
  );
};

export {fetchRandomNumberAction};
