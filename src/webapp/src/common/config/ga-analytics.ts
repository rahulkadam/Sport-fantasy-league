import ReactGA from 'react-ga';
import history from './history';

export function init_GA(trackingCode: string) {
  trackingCode = 'UA-163626855-1';
  ReactGA.initialize(trackingCode);
}

export const GA_Exception = (detail: any) => {
  ReactGA.exception({description: detail});
};

export const GA_Event = (categoryName: string, eventName: string) => {
  ReactGA.event({
    category: categoryName,
    action: eventName,
    label: 'labelName',
    value: 10,
    nonInteraction: false,
  });
};

export const GA_PageView = (page: string) => {
  ReactGA.pageview(page);
};

history.listen(router => {
  // console.log('Triggered ' + router.pathname);
  // ReactGA.set({page: router.pathname});
  GA_PageView('quickpay page' + router.pathname);
});
