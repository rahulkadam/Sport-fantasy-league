import {useDispatch} from 'react-redux';
import {
  FETCH_ACCOUNT_BILL,
  FETCH_ACCOUNT_BILL_STARTED,
  FETCH_ACCOUNT_BILL_ERROR,
  FETCH_ACCOUNT_BILL_CLEAR,
} from './quickpayConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';
import {fetchPaymentDetailsByAccountNumber} from './quickpay-api';

export const FetchBillAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, FETCH_ACCOUNT_BILL_STARTED),
    (accountNumber: number) => {
      fetchPaymentDetailsByAccountNumber(accountNumber)
        .then((data: any) => {
          dispatch({
            type: FETCH_ACCOUNT_BILL,
            data: data,
          });
        })
        .catch((error: any) => {
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
