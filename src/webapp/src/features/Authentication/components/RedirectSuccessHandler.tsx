import React from 'react';
import history from 'common/config/history';
import {setAccessToken} from 'API';

const RedirectSuccessHandler = () => {
  function useQuery() {
    return new URLSearchParams(history.location.search);
  }
  const query = useQuery();
  const accesstoken = query.get('exchange_for_fantasy_token');

  function redirectToUserInfo() {
    accesstoken && setAccessToken(accesstoken);
    accesstoken && history.push('/userInfo');
  }

  return (
    <div>
      Errro Occured in Authentication {accesstoken && redirectToUserInfo()}
    </div>
  );
};
export {RedirectSuccessHandler};
