import React from 'react';
import {Table} from 'react-bootstrap';
import {Icon} from '../../../common/styles/Icon/';

const TransactionHistory = () => {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EV9872313</td>
            <td>110</td>
            <td>09/07/2019</td>
            <td>
              <Icon name="view" />
            </td>
          </tr>
          <tr>
            <td>EV9872313</td>
            <td>123.40</td>
            <td>06/07/2019</td>
            <td>
              <Icon name="view" />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export {TransactionHistory};
