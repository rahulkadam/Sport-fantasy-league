import * as React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {FooterLinkConfig, FooterLinkConfigObject} from './FooterLinkConfig';
import './Footer.css';

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

  /**
   * Render Copy Right Details
   */
  function renderCopyRight() {
    const year = new Date().getFullYear();
    const copyrightText =
      year +
      ' Measat Broadcast Network Systems Sdn Bhd (240064-A). All Rights Reserved.';
    return (
      <div>
        <span>&copy; </span>
        <span>{copyrightText}</span>
      </div>
    );
  }

  return (
    <Container fluid className="footer footerText bgDark">
      <hr className="mb-0 horizontal-line" />
      <Row className="py-3">
        <Col md={'6'} className="my-auto">
          <div className="footerLinks pb-2">{renderFooterLink()}</div>
        </Col>
        <Col md={'auto'} className="my-auto ml-auto">
          {renderCopyRight()}
        </Col>
      </Row>
    </Container>
  );
};

export {Footer};
