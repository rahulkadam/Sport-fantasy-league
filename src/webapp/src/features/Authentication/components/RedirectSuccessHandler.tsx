import React from 'react';
import history from 'common/config/history';

const RedirectSuccessHandler = () => {
  function useQuery() {
    return new URLSearchParams(history.location.search);
  }
  const query = useQuery();
  const accesstoken = query.get('exchange_for_fantasy_token');
  console.log(localStorage.getItem('fantasy_access_token'));

  function redirectToUserInfo() {
    accesstoken && localStorage.setItem('fantasy_access_token', accesstoken);
    accesstoken && history.push('/userInfo');
  }

  return (
    <div>
      Errro Occured in Authentication {accesstoken && redirectToUserInfo()}
    </div>
  );
};
export {RedirectSuccessHandler};
