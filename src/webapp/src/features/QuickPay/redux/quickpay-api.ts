import {Get} from 'API';

function fetchPaymentDetailsByAccountNumber(accountNumber: number) {
  console.log('account: ' + accountNumber);
  return Get('/userbill/' + accountNumber)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

export {fetchPaymentDetailsByAccountNumber};
