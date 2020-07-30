import {useDispatch} from 'react-redux';
import {
  FETCH_ACCOUNT_BILL,
  FETCH_ACCOUNT_BILL_STARTED,
  FETCH_ACCOUNT_BILL_ERROR,
  FETCH_ACCOUNT_BILL_CLEAR,
} from './quickpayUConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';
import {fetchBillByAccountNumber} from './quickpayUService';

export const FetchBillAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, FETCH_ACCOUNT_BILL_STARTED),
    (accountNumber: string) => {
      fetchBillByAccountNumber(accountNumber)
        .then(data => {
          dispatch({
            type: FETCH_ACCOUNT_BILL,
            data: data,
          });
        })
        .catch(error => {
          dispatch({
            type: FETCH_ACCOUNT_BILL_ERROR,
          });
        });
    }
  );
};

export const ClearBillAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, FETCH_ACCOUNT_BILL_CLEAR)
  );
};
