import * as React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {FooterLinkConfig, FooterLinkConfigObject} from './FooterLinkConfig';
import './Footer.css';
import TwitterHashtag from './socialmedia/TwitterHashtag';
import {TwitterFollowButton, TwitterHashtagButton} from 'react-twitter-embed';

const Footer = () => {
  const linksArray = FooterLinkConfig.FooterLinks;
  const linksRenderArray: any = [];

  /**
   * Rendering link in footer
   * @param data
   */
  function renderLink(data: FooterLinkConfigObject) {
    return (
      <div>
        <a className="text-white" href={data.href}>
          {data.linkName}
        </a>
      </div>
    );
  }

  /**
   * render all footer link in one div
   */
  function renderFooterLink() {
    linksArray.forEach(data => {
      linksRenderArray.push(renderLink(data));
      linksRenderArray.push(<span className="footerSpan">|</span>);
    });
    return linksRenderArray;
  }

  function renderTwitterFooter() {
    return (
      <div>
        <TwitterHashtagButton tag="IPLFantasy2020" />
        <TwitterFollowButton screenName={'IPLFantasy20201'} />
      </div>
    );
  }

  return (
    <div>
      {renderTwitterFooter()}
      <Container fluid className="footer footerText bgDark">
        <hr className="mb-0 horizontal-line" />
        <Row>
          <Col md={'6'} className="my-auto">
            <div className="footerLinks pb-2">{renderFooterLink()}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export {Footer};
