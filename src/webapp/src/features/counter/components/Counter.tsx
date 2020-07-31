import React, {useEffect} from 'react';
import {
  getCounterStoreData,
  incrementCounterAction,
  clearCounterAction,
} from '../redux';
import classes from './Counter.module.css';

const Counter = () => {
  const counterData = getCounterStoreData();
  const incrementCounter = incrementCounterAction();
  const clearCounter = clearCounterAction();

  /**
   * function for cleaning up data (similar to component didMount method)
   */
  useEffect(
    () => () => {
      console.log('component unmount');
      clearCounter();
    },
    [clearCounter]
  );

  /**
   * function for calling, every time when state changes (Component will mount properties)
   */
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });

  /**
   * function for calling, every once only when component did mount (Component did mount properties)
   */
  useEffect(() => {
    console.log('component Did Mount, render only once');
  }, []);

  return (
    <div>
      <div className={classes.counter}>
        <h2 className={classes.header}>APG Stats Counter</h2>
        <button
          className={classes.button}
          type="button"
          onClick={() => {
            incrementCounter(counterData);
          }}>
          Visit Page
        </button>
        <div>
          Total APG Views: <strong>{counterData.value}</strong>
        </div>
        <div>
          Total value of Payment Page: <strong>{counterData.value1}</strong>
        </div>
        <div>
          Total value of Result Page: <strong>{counterData.value}</strong>
        </div>
      </div>
    </div>
  );
};

export default Counter;
