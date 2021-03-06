import React, {Suspense, useEffect} from 'react';
import ReactDOM from 'react-dom';
import reduxStore from './config/redux/reduxStore';
import {BaseRoute} from './config/route';
import * as serviceWorker from './config/pwa/serviceWorker';
import {init_GA} from './common/config';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {Footer} from './common/components/Footer';
import {Header} from './features/Header';

/**
 *
 * @returns {*}
 * @constructor
 */
const Root = () => {
  useEffect(() => {
    init_GA('tracking_code');
  }, []);

  return (
    <div className="mainContainer">
      <div className="backgroundImageRight">Text images and player List</div>
      <Header />
      <div className="fixedHeaderContainer">
        <BaseRoute />
      </div>
      <Footer />
    </div>
  );
};

/** Wrap App component with store providers */
const WrappedApp = reduxStore(Root);

/**
 * Render DOm, starting Application from here, by rendeing into root element ID
 */
ReactDOM.render(<WrappedApp />, document.getElementById('root'));

/**
 * If you want your app to work offline and load faster,
 * you can change unregister() to register() below.
 * Note this comes with some pitfalls.
 * @see https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
