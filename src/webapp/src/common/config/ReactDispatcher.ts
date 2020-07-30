import {useCallback} from 'react';

function dispatchActionWrapper(dispatch: any, ...rest: any[]) {
  return useCallback(
    (...callbackParam) => {
      rest.forEach(callbackFunction => {
        callbackFunction(...callbackParam);
      });
    },
    [dispatch]
  );
}

function dispatchAction(dispatch: any, actionName: string) {
  return () => {
    dispatch({
      type: actionName,
    });
  };
}

export {dispatchActionWrapper, dispatchAction};
