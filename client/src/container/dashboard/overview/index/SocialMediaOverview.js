import React from 'react';
import { Row, Col } from 'antd';
import { SocialMediaWrapper } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { SocialMediaContent } from '../../../../components/social-media/overview';

const SocialMediaOverview = () => {
  return (
    <SocialMediaWrapper>
      <Cards title="Social Media Overview" size="large">
        <Row gutter={25}>
          <Col xxl={8} md={4} xs={8}>
            <SocialMediaContent icon="pinterest-p" bgColor="#E32212" title="5,461" subTitle="Followers" />
          </Col>
        </Row>
      </Cards>
    </SocialMediaWrapper>
  );
};

export default SocialMediaOverview;
