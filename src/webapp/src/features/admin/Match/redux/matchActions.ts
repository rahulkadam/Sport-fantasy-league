import {useDispatch} from 'react-redux';
import {createMatch, fetchAllMatchList} from './match-api';
import {
  ACTION_START,
  CREATE_MATCH,
  CREATE_MATCH_ERROR,
  GET_MATCH_LIST,
  GET_MATCH_LIST_ERROR,
} from './matchConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

const fetchMatchListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchAllMatchList()
        .then((data: any) => {
          dispatch({
            type: GET_MATCH_LIST,
            matchList: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: GET_MATCH_LIST_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const createMatchAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (matchRequestObject: CreateMatchRequestObject) => {
      createMatch(matchRequestObject)
        .then((data: any) => {
          dispatch({
            type: CREATE_MATCH,
            message: 'Created successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: CREATE_MATCH_ERROR,
            data: error.message,
          });
        });
    }
  );
};

export {fetchMatchListAction, createMatchAction};
