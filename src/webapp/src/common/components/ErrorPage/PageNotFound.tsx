import React from 'react';
import {useParams} from 'react-router-dom';

const PageNotFound = () => {
  const url: any = useParams();
  return (
    <div className="page-container">
      <h1 className="title">Work in Progress, Please try after 1st Sept</h1>
    </div>
  );
};

export default PageNotFound;
