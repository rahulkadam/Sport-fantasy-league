import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getAdminProcessData = () =>
  useSelector((state: RootState) => state.processadmin);
