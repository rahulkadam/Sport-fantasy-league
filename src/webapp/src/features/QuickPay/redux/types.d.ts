declare type BillView = {
  username?: string;
  firstname?: string;
  lastname?: string;
  userid?: string;
  totalAmount?: number;
  overdueAmount?: number;
  dueDate?: string;
  accountNumber?: string;
  isFetching?: boolean;
};
