import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {
  TwitterDMButton,
  TwitterFollowButton,
  TwitterHashtagButton,
} from 'react-twitter-embed';
import './twitter.styles.scss';

const TwitterFooter = () => {
  function renderTwitterFooter() {
    return (
      <div>
        <Row>
          <Col>
            <TwitterHashtagButton tag="IPLFantasy2020" />
          </Col>
          <Col>
            {' '}
            <TwitterFollowButton screenName={'IPLFantasy20201'} />
          </Col>
        </Row>
      </div>
    );
  }

  return <div className="twitterfooterContainer">{renderTwitterFooter()}</div>;
};

export default TwitterFooter;
