import {
  FETCH_ACCOUNT_BILL,
  FETCH_ACCOUNT_BILL_STARTED,
  FETCH_ACCOUNT_BILL_COMPLETED,
  FETCH_ACCOUNT_BILL_ERROR,
  FETCH_ACCOUNT_BILL_CLEAR,
} from './quickpayUConstants';

const initialState: BillView = {
  username: '',
  firstname: '',
  lastname: '',
  userid: '',
  totalAmount: 0,
  overdueAmount: 0,
  dueDate: '',
  accountNumber: '',
  isFetching: false,
};

export default (state: BillView = initialState, action: any): BillView => {
  let billViewObject: BillView;
  switch (action.type) {
    case FETCH_ACCOUNT_BILL_STARTED:
      return state;
    case FETCH_ACCOUNT_BILL:
      return state;
    case FETCH_ACCOUNT_BILL_COMPLETED:
      return state;
    case FETCH_ACCOUNT_BILL_ERROR:
      return state;
    case FETCH_ACCOUNT_BILL_CLEAR:
      return state;
    default:
      return state;
  }
};
