import {useDispatch} from 'react-redux';
import {
  createMatch,
  fetchAllMatchList,
  fetchCompletedMatchList,
  uploadMatchPlayerPoints,
  uploadMatchResult,
} from './match-api';
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

const fetchCompletedMatchListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchCompletedMatchList()
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

const uploadMatchPlayerPointAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (requestObject: PlayerMatchPointRequestObject) => {
      uploadMatchPlayerPoints(requestObject)
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

const uploadMatchResultAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (requestObject: MatchResultObject) => {
      uploadMatchResult(requestObject)
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

export {
  fetchMatchListAction,
  createMatchAction,
  uploadMatchPlayerPointAction,
  uploadMatchResultAction,
  fetchCompletedMatchListAction,
};
