import {useDispatch} from 'react-redux';
import {createVenue, fetchAllVenueList} from './venue-api';
import {
  ACTION_START,
  CREATE_VENUE,
  CREATE_VENUE_ERROR,
  GET_VENUE_LIST,
  GET_VENUE_LIST_ERROR,
} from './venueConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

const fetchVenueListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchAllVenueList()
        .then((data: any) => {
          dispatch({
            type: GET_VENUE_LIST,
            venueList: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: GET_VENUE_LIST_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const createVenueAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (name: string, country: string, city: string) => {
      createVenue(name, country, city)
        .then((data: any) => {
          dispatch({
            type: CREATE_VENUE,
            message: 'Created successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: CREATE_VENUE_ERROR,
            data: error.message,
          });
        });
    }
  );
};

export {fetchVenueListAction, createVenueAction};
