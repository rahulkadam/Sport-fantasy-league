import {Get} from 'API';

function fetchPaymentDetailsByAccountNumber(accountNumber: number) {
  console.log('account: ' + accountNumber);
  return Get('/userbill/' + accountNumber)
    .then((data: any) => {
      return data;
    })
    .catch((error: any) => {
      throw error;
    });
}

export {fetchPaymentDetailsByAccountNumber};
