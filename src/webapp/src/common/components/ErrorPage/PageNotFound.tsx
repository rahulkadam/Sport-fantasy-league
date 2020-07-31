import React from 'react';
import {useParams} from 'react-router-dom';

const PageNotFound = () => {
  const url: any = useParams();
  return (
    <div className="page-container">
      <h1 className="title">404 page Not Found for {url[0]}</h1>
    </div>
  );
};

export default PageNotFound;
