import {Get} from 'API';

function fetchBillByAccountNumber(accountNumber: string) {
  console.log('account: ' + accountNumber);
  return Get('/userbill/' + accountNumber)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

export {fetchBillByAccountNumber};
