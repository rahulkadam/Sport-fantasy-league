import ReactGA from 'react-ga';
import history from './history';

export function init_GA(trackingCode: string) {
  trackingCode = 'UA-163626855-1';
  ReactGA.initialize(trackingCode);
}

export const GA_Exception = (detail: any) => {
  ReactGA.exception({description: detail});
};

export const GA_Event = (category: string, event: string, label: string) => {
  ReactGA.event({
    category: category,
    action: event,
    label: label,
    value: 10,
    nonInteraction: false,
  });
};

export const GA_PageView = (page: string) => {
  ReactGA.pageview(page);
};

history.listen(router => {
  GA_PageView('Fantasy page : ' + router.pathname);
});

export const GA_USER_Event = (action: string) => {
  ReactGA.event({
    category: 'User',
    action: action,
  });
};

export const GA_Team_Event = (action: string) => {
  ReactGA.event({
    category: 'Team',
    action: action,
  });
};

export const GA_League_Event = (action: string) => {
  ReactGA.event({
    category: 'League',
    action: action,
  });
};

export const GA_Other_Event = (type: string) => {
  ReactGA.event({
    category: 'Other',
    action: type,
  });
};
